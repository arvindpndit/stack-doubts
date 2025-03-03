//@ts-nocheck

'use client';
import React, { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { questionSchema } from '@/lib/schema';
import z from 'zod';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AiOutlineClose } from 'react-icons/ai';
import Input from '../ui/input';
import { createQuestion } from '@/lib/actions/question.action';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import TagInput from './TagInput';

interface Props {
  mongoUserId: string;
}

const AskQuestionForm = ({ mongoUserId }: Props) => {
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const [tags, setTags] = useState(['kdjfl', 'kdjfld']);
  const [inputValue, setInputValue] = useState('');

  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: '',
      explanation: '',
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    await createQuestion({
      title: values.question,
      content: values.explanation,
      tags: values.tags,
      path: pathname,
      author: JSON.parse(mongoUserId),
    });
    // navigate to home page
    router.push('/');
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      let tagValue = tagInput.value;

      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            message: 'Tag must be less than 15 characters.',
          });
        }

        if (tagValue.includes(' ')) {
          form.setError('tags', {
            message: 'Tags cannot contain spaces.',
          });
          return;
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue]);
          form.clearErrors('tags');
          tagInput.value = '';
        } else {
          form.trigger('tags');
        }
      }
    }
  };

  return (
    <div className="mt-8 pb-24 lg:pb-14">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full px-1 py-3 md:px-8 md:py-8 "
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium ">
                  Question Title *
                </FormLabel>
                <FormControl className="mt-1">
                  <Input
                    type="text"
                    placeholder="Type your question here"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Be specific and imagine you’re asking a question to another
                  person.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <br />

          {/* explanation */}
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem{' '}
                  <span className="text-primary-500">*</span>
                </FormLabel>
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
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <br />

          {/* tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    placeholder="Add tags..."
                    //disabled={true}
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  />
                </FormControl>
                <div className="flex flex-wrap gap-2 p-2 rounded-md mt-2">
                  {field.value.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-orange-100 dark:bg-orange-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          form.setValue(
                            'tags',
                            field.value.filter((_, i) => i !== index),
                          );
                          form.trigger('tags');
                        }}
                        className="ml-1"
                      >
                        <AiOutlineClose size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  {/* Adding tags is disabled. This feature will be added in
                  upcoming release. */}
                  Add up to tags to describe what your question is about. You
                  need to press enter to add a tag.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <br />

          <Button
            className="bg-orange-500 rounded-full hover:bg-orange-600"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AskQuestionForm;

