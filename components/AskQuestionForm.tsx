"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { questionSchema } from "@/lib/schema";
import z from "zod";

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

const AskQuestionForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionSchema>) {
    console.log(values);
  }

  return (
    <div className="mt-8">
      {/* Question input form */}
      <Form
        {...form}
        className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Detailed explanation of your problem?*
                  </FormLabel>
                  <FormControl className="mt-1">{/* later */}</FormControl>
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
              name="username"
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
    </div>
  );
};

export default AskQuestionForm;
