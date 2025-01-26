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

interface Props {
  id: string;
  mongoUserId: string;
}

const AnswerForm = ({ id, mongoUserId }: Props) => {
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

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
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent('');
      }
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
                      content_style:
                        'body { font-family:Inter; font-size:16px }',
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

