"use client";
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { questionSchema } from "@/lib/schema";
import z from "zod";
import { Editor } from "@tinymce/tinymce-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "./ui/input";
import { createQuestion } from "@/lib/actions/question.action";

const AskQuestionForm = () => {
  const editorRef = useRef(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionSchema>) {
    console.log("Question Title:", values.question);
    console.log(values);
  }

  return (
    <div className="mt-8 mb-10">
      {/* Question input form */}
      <Form
        {...form}
        className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Question Title *
                </FormLabel>
                <FormControl className="mt-1">
                  <Input
                    type="text"
                    placeholder="Type your question here"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
        </form>
      </Form>

      {/* explaination */}
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Detailed explanation of your problem?*
                  </FormLabel>
                  <FormControl className="mt-1">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_URL_API_KEY}
                      onInit={(evt, editor) => {
                        //@ts-ignore
                        editorRef.current = editor;
                      }}
                      initialValue=""
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | ",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Introduce the problem and expand on what you put in the
                    title. Minimum 20 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {/* Tags */}
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Tags *
                  </FormLabel>
                  <FormControl className="mt-1">
                    <Input
                      type="text"
                      placeholder="Add Tags..."
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Add up to 3 tags to describe what your question is about.
                    You need to press enter to add a tag.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <button
        onClick={() => {
          createQuestion();
          console.log("button clicked");
        }}
      >
        connect to db
      </button>
    </div>
  );
};

export default AskQuestionForm;
