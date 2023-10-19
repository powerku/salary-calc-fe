"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const FormSchema = z.object({
  current: z.string().min(2, {
    message: "현재 연봉을 입력해주세요",
  }),
  percent: z.string().min(1, {
    message: "인상률을 입력해주세요",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      current: "",
      percent: "",
    },
  });

  const [result, setResult] = useState("0");

  const onReset = (e: React.MouseEvent<HTMLElement>) => {
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const currentSalary = Number(values.current);
    const increaseRate = Number(values.percent);
    setResult(
      Number(
        (currentSalary + (currentSalary * increaseRate) / 100).toFixed(0),
      ).toLocaleString("ko-KR"),
    );
  };

  return (
    <Form {...form}>
      <form
        className="mx-auto my-0 w-[300px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="current"
          render={({ field }) => (
            <FormItem>
              <FormLabel>현재 연봉</FormLabel>
              <FormControl>
                <NumericTextBox field={field}></NumericTextBox>
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="percent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인상률(%)</FormLabel>
              <FormControl>
                <NumericTextBox field={field}></NumericTextBox>
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />
        <FormMessage />
        <div className="mx-auto my-3 text-center" style={{ width: "300px" }}>
          <Button variant="ghost" onClick={onReset} className="mr-1 border">
            초기화
          </Button>
          <Button type="submit" className="text-white">
            인상액 계산
          </Button>
        </div>
        <FormDescription className="text-center text-xl">
          인상된 연봉은 {result}원 입니다.
        </FormDescription>
      </form>
    </Form>
  );
}
