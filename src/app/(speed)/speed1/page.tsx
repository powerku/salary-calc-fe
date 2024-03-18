"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  speed: z.string().min(2, {}),
});

type Time = {
  hour: string;
  min: string;
  sec: string;
};

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      speed: "10",
    },
  });
  const watchCurrent = form.watch("speed");

  useEffect(() => {
    form.watch((value) => {
      const salary = Number(value.speed);
      setSpeed(salary);
    });
  }, [form, watchCurrent]);

  const initialTime = {
    hour: "00",
    min: "00",
    sec: "00",
  };

  const [speed, setSpeed] = useState<number>(10); // form.getValues("current") as number
  const [time100m, setTime100m] = useState<Time>(initialTime);
  const [time1Km, setTime1km] = useState<Time>(initialTime);
  const [time3Km, setTime3km] = useState<Time>(initialTime);
  const [time5Km, setTime5km] = useState<Time>(initialTime);
  const [time10Km, setTime10km] = useState<Time>(initialTime);
  const [timeHalf, setTimeHalf] = useState<Time>(initialTime);
  const [timeFull, setTimeFull] = useState<Time>(initialTime);

  const onChange = (value: any) => {
    form.setValue("speed", value[0].toString());
  };

  const format = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  const getTime = () => {
    if (speed === 0) {
      setTime1km({
        hour: "00",
        min: "00",
        sec: "00",
      });
      setTime3km({
        hour: "00",
        min: "00",
        sec: "00",
      });
      setTime5km({
        hour: "00",
        min: "00",
        sec: "00",
      });
      return;
    }

    const time1Km = 1 / speed;
    const time100m = time1Km * 0.1;
    const time3Km = time1Km * 3;
    const time5Km = time1Km * 5;
    const time10Km = time1Km * 10;
    const timeHalf = time1Km * 21.0975;
    const timeFull = time1Km * 42.195;

    const getTime = (value: number) => {
      return {
        hour: format(Math.floor(value)),
        min: format(
          value >= 1
            ? Math.floor((value - Math.floor(value)) * 60)
            : Math.floor(value * 60),
        ),
        sec: format(Math.floor((value * 60 - Math.floor(value * 60)) * 60)),
      };
    };

    setTime100m(getTime(time100m));
    setTime1km(getTime(time1Km));
    setTime3km(getTime(time3Km));
    setTime5km(getTime(time5Km));
    setTime10km(getTime(time10Km));
    setTimeHalf(getTime(timeHalf));
    setTimeFull(getTime(timeFull));
  };

  useEffect(() => {
    getTime();
  }, [speed]);

  return (
    <>
      <Form {...form}>
        <form className="mx-auto my-0 w-[300px]">
          <FormField
            control={form.control}
            name="speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시속(km/h)</FormLabel>
                <FormControl>
                  <NumericTextBox
                    field={field}
                    setValue={setSpeed}
                  ></NumericTextBox>
                </FormControl>
                <FormMessage className="text-sm text-red-400" />
              </FormItem>
            )}
          />
          <>
            <Slider
              className="my-5"
              defaultValue={[speed]}
              value={[speed]}
              max={40}
              step={0.5}
              onValueChange={onChange}
            />
          </>

          <div className="flex flex-col gap-1">
            <FormDescription className="text-base">
              100m 페이스: {time100m.hour}시간 {time100m.min}분 {time100m.sec}초
            </FormDescription>
            <FormDescription className="text-xl">
              1km 페이스: {time1Km.hour}시간 {time1Km.min}분 {time1Km.sec}초
            </FormDescription>
            <FormDescription className="text-base">
              3km 기록: {time3Km.hour}시간 {time3Km.min}분 {time3Km.sec}초
            </FormDescription>
            <FormDescription className="text-base">
              5km 기록: {time5Km.hour}시간 {time5Km.min}분 {time5Km.sec}초
            </FormDescription>
            <FormDescription className="text-base">
              10km 기록: {time10Km.hour}시간 {time10Km.min}분 {time10Km.sec}초
            </FormDescription>
            <FormDescription className="text-base">
              Half(21.0975.km) 기록: {timeHalf.hour}시간 {timeHalf.min}분{" "}
              {timeHalf.sec}초
            </FormDescription>
            <FormDescription className="text-base">
              Full(42.105km) 기록: {timeFull.hour}시간 {timeFull.min}분{" "}
              {timeFull.sec}초
            </FormDescription>
          </div>
        </form>
      </Form>
      <div className="item-center flex flex-col justify-center">
        <iframe
          src="https://ads-partners.coupang.com/widgets.html?id=750291&template=carousel&trackingCode=AF5735283&subId=&width=320&height=100&tsource="
          width="320"
          height="100"
          frameBorder="0"
          scrolling="no"
          referrerPolicy="unsafe-url"
          className="mx-auto"
        ></iframe>
        <span className="mx-auto text-center text-sm">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
          제공받습니다.
        </span>
      </div>
    </>
  );
}
