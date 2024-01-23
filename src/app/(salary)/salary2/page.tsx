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
              <FormMessage className="text-sm text-red-400" />
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
              <FormMessage className="text-sm text-red-400" />
            </FormItem>
          )}
        />
        <FormMessage />
        <div className="mx-auto my-3 text-center" style={{ width: "300px" }}>
          <Button variant="ghost" onClick={onReset} className="mr-1 border">
            초기화
          </Button>
          <Button type="submit" className="bg-primary text-primary-foreground">
            인상액 계산
          </Button>
        </div>
        <FormDescription className="text-center text-xl">
          인상된 연봉은 {result}원 입니다.
        </FormDescription>
        <iframe
          src="https://ads-partners.coupang.com/widgets.html?id=750291&template=carousel&trackingCode=AF5735283&subId=&width=320&height=100&tsource="
          width="320"
          height="100"
          frameBorder="0"
          scrolling="no"
          referrerPolicy="unsafe-url"
          browsingtopics
        ></iframe>
        <span className="text-center text-sm">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
          수수료를
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          제공받습니다."
        </span>
      </form>
    </Form>
  );
}
