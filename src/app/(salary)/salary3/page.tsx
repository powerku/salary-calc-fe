"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import getNetPay, { SalaryReport } from "@/lib/getNetPay";
import { format } from "@/lib/utils";

import { CaretRightIcon } from "@radix-ui/react-icons";
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
import { Slider } from "@/components/ui/slider";
import NumericTextBox from "@/components/NumericTextBox";

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
  const watchCurrent = form.watch("current");

  useEffect(() => {
    form.watch((value) => {
      const salary = Number(value.current);
      setSalary(salary);
    });
  }, [form, watchCurrent]);

  const router = useRouter();

  const [salary, setSalary] = useState<number>(0); // form.getValues("current") as number
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

  const goLandPage = () => {
    let price = netPay?.preTax ?? 0;
    const min = (+price * 5) / 10000;
    const max = (+price * 6) / 10000;
    router.push(
      `https://m.land.naver.com/map/37.483564:127.032594:12:1165000000/APT/A1?dprcMin=${min}&dprcMax=${max}`,
    );
  };

  const goKoreaCarPage = () => {
    let price = netPay?.preTax ?? 0;
    price = ((+price / 12) * 6) / 10000;
    const min = +price * 0.9;
    const max = +price * 1.1;

    router.push(
      `http://www.encar.com/dc/dc_carsearchlist.do?carType=kor&searchType=model#!%7B%22action%22%3A%22(And.Hidden.N._.CarType.Y._.Price.range(${min}..${max}).)%22%2C%22toggle%22%3A%7B%224%22%3A1%7D%2C%22layer%22%3A%22%22%2C%22sort%22%3A%22ModifiedDate%22%2C%22page%22%3A1%2C%22limit%22%3A20%2C%22searchKey%22%3A%22%22%2C%22loginCheck%22%3Afalse%7D`,
    );
  };

  const onChange = (value: any) => {
    form.setValue("current", value[0].toString());
    form.trigger("current");
    onSubmit(form.getValues());
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
                <NumericTextBox
                  field={field}
                  setValue={setSalary}
                ></NumericTextBox>
              </FormControl>
              <FormMessage className="text-sm text-red-400" />
            </FormItem>
          )}
        />
        <>
          <Slider
            className="my-5"
            defaultValue={[salary]}
            value={[salary]}
            max={200000000}
            step={10000}
            onValueChange={onChange}
          />
        </>
        <div className="mx-auto my-3 text-center" style={{ width: "300px" }}>
          <Button variant="ghost" onClick={onReset} className="mr-1 border">
            초기화
          </Button>
          <Button type="submit" className="bg-primary text-primary-foreground">
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
        {netPay && (
          <div className="flex flex-col gap-1">
            <Button onClick={goLandPage} className="text-white">
              내 연봉에 맞는 서울 아파트 보기
            </Button>
            <Button onClick={goKoreaCarPage} className="text-white">
              내 연봉에 맞는 국산 중고차 보기
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
