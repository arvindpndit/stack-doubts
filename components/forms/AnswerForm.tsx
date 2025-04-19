'use client';
import React, { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { answerSchema } from '@/lib/schema';
import z from 'zod';
import { Editor } from '@tinymce/tinymce-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { usePathname, useRouter } from 'next/navigation';
import { createAnswer } from '@/lib/actions/answer.action';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { sendAnswerEmail } from '@/lib/actions/send-email.action';

interface Props {
  id: string;
  mongoUserId: string;
  question: any;
}

const AnswerForm = ({ id, mongoUserId, question }: Props) => {
  const editorRef = useRef(null);
  const pathname = usePathname();
  const { theme } = useTheme();

  // 1. Define your form.
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof answerSchema>) {
    try {
      await createAnswer({
        content: values.content,
        author: JSON.parse(mongoUserId),
        question: id,
        path: pathname,
      });
      await sendAnswerEmail({
        recipientEmail: question.author,
        questionTitle: question.title,
        id: id,
      });
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent('');
      }
      toast('Nice one! Your knowledge is valuable. Keep it up! 👏');
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          {/* answer */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="mt-3.5">
                  <Editor
                    key={theme}
                    apiKey={process.env.NEXT_PUBLIC_TINY_URL_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue=""
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                      ],
                      toolbar:
                        'undo redo | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter |' +
                        'alignright alignjustify | bullist numlist',
                      skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: theme === 'dark' ? 'dark' : 'default',
                      content_style: `
                        body { 
                          background-color: ${
                            theme === 'dark' ? '#1e293b' : '#ffffff'
                          }; 
                          color: ${theme === 'dark' ? '#f8fafc' : '#1e293b'}; 
                          font-family: 'Inter', sans-serif;
                          padding: 10px;
                        }
                      `,
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <br />

          <Button
            className="bg-orange-500 rounded-full hover:bg-orange-600"
            type="submit"
          >
            Post Answer
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;

