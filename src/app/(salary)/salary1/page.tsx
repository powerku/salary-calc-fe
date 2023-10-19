"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
import NumericTextBox from "@/components/NumericTextBox";

const formSchema = z.object({
  before: z.string().min(1, {
    message: "직전 연봉을 입력해주세요",
  }),
  current: z.string().min(1, {
    message: "현재 연봉을 입력해주세요",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      before: "",
      current: "",
    },
  });

  const [rate, setRate] = useState(0);

  const onReset = (e: React.MouseEvent<HTMLElement>) => {
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const before = Number(values.before);
    const after = Number(values.current);
    setRate(Number((((after - before) / before) * 100).toFixed(2)));
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto my-0 w-[300px]"
        >
          <FormField
            control={form.control}
            name="before"
            render={({ field }) => (
              <FormItem>
                <FormLabel>직전 연봉</FormLabel>
                <FormControl>
                  <NumericTextBox field={field}></NumericTextBox>
                </FormControl>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current"
            render={({ field }) => (
              <FormItem>
                <FormLabel>현재 연봉</FormLabel>
                <FormControl>
                  <NumericTextBox field={field} />
                </FormControl>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />
          <div
            className="mx-auto my-3 flex justify-center gap-1 text-center"
            style={{ width: "300px" }}
          >
            <Button
              type="reset"
              variant="ghost"
              onClick={onReset}
              className="mr-1 border"
            >
              초기화
            </Button>
            <Button type="submit" className="text-white">
              인상률 계산
            </Button>
          </div>
          <FormDescription className="text-center text-xl">
            인상률은 {rate}%입니다.
          </FormDescription>
        </form>
      </Form>
    </div>
  );
}
