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
import getNetPay, { SalaryReport } from "@/lib/getNetPay";
import { format } from "@/lib/utils";
import * as net from "net";
import { CaretRightIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  current: z.string().min(2, {
    message: "현재 연봉을 입력해주세요",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      current: "",
    },
  });

  const [netPay, setNetPay] = useState<SalaryReport | null>(null);

  const onReset = (e: React.MouseEvent<HTMLElement>) => {
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const currentSalary = Number(values.current);
    const netPay = getNetPay(currentSalary);
    setNetPay(netPay);
  };

  const getMonthPay = (pay: number): string => {
    return Number((pay / 12).toFixed(0)).toLocaleString("ko-KR");
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
        <div className="mx-auto my-3 text-center" style={{ width: "300px" }}>
          <Button variant="ghost" onClick={onReset} className="mr-1 border">
            초기화
          </Button>
          <Button type="submit" className="text-white">
            실수령액 계산
          </Button>
        </div>
        {netPay && (
          <div className="flex flex-col gap-1">
            <FormDescription className="text-sm">
              국민연금 (4.5%): {getMonthPay(+netPay.pension)}원
            </FormDescription>
            <FormDescription className="text-sm">
              건강보험 (3.545%): {getMonthPay(+netPay.health)}원
            </FormDescription>
            <FormDescription className="flex text-sm">
              <CaretRightIcon className="my-auto mr-2 h-4 w-4" />
              장기요양(12.81%) : {getMonthPay(+netPay.care)}원
            </FormDescription>
            <FormDescription className="text-sm">
              고용보험(0.9%): {getMonthPay(+netPay.hire)}원
            </FormDescription>
            <FormDescription className="text-sm">
              소득세(간이세액): {getMonthPay(+netPay.incomeTax)}원
            </FormDescription>
            <FormDescription className="flex text-sm">
              <CaretRightIcon className="my-auto mr-2 h-4 w-4" />
              지방소득세: {getMonthPay(+netPay.incomeTaxLocal)}원
            </FormDescription>
            <FormDescription className="text-xl">
              세후 연봉: {format(+netPay.afterTax)}원
            </FormDescription>
            <FormDescription className="text-2xl">
              월 실수령액:
              {" " + format(Number(+netPay!.afterTax / 12).toFixed(0))}원
            </FormDescription>
          </div>
        )}
      </form>
    </Form>
  );
}
