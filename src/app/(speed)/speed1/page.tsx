"use client";
import React, { useEffect, useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import NumericTextBox from "@/components/NumericTextBox";

const FormSchema = z.object({
  speed: z.string().min(2, {}),
});

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

  const [speed, setSpeed] = useState<number>(10); // form.getValues("current") as number
  const [time1Km, setTime1km] = useState<{
    hour: string;
    min: string;
    sec: string;
  }>({
    hour: "00",
    min: "00",
    sec: "00",
  });
  const [time3Km, setTime3km] = useState<{
    hour: string;
    min: string;
    sec: string;
  }>({
    hour: "00",
    min: "00",
    sec: "00",
  });
  const [time5Km, setTime5km] = useState<{
    hour: string;
    min: string;
    sec: string;
  }>({
    hour: "00",
    min: "00",
    sec: "00",
  });
  const [time10Km, setTime10km] = useState<{
    hour: string;
    min: string;
    sec: string;
  }>({
    hour: "00",
    min: "00",
    sec: "00",
  });
  const [timeHalf, setTimeHalf] = useState<{
    hour: string;
    min: string;
    sec: string;
  }>({
    hour: "00",
    min: "00",
    sec: "00",
  });
  const [timeFull, setTimeFull] = useState<{
    hour: string;
    min: string;
    sec: string;
  }>({
    hour: "00",
    min: "00",
    sec: "00",
  });

  const onReset = (e: React.MouseEvent<HTMLElement>) => {
    form.reset();
  };

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
    const time3Km = time1Km * 3;
    const time5Km = time1Km * 5;
    const time10Km = time1Km * 10;
    const timeHalf = time1Km * 21.0975;
    const timeFull = time1Km * 42.195;

    setTime1km({
      hour: format(Math.floor(time1Km)),
      min: format(
        time1Km >= 1
          ? Math.floor((time1Km - Math.floor(time1Km)) * 60)
          : Math.floor(time1Km * 60),
      ),
      sec: format(Math.floor((time1Km * 60 - Math.floor(time1Km * 60)) * 60)),
    });
    setTime3km({
      hour: format(Math.floor(time3Km)),
      min: format(
        time3Km >= 1
          ? Math.floor((time3Km - Math.floor(time3Km)) * 60)
          : Math.floor(time3Km * 60),
      ),
      sec: format(Math.floor((time3Km * 60 - Math.floor(time3Km * 60)) * 60)),
    });
    setTime5km({
      hour: format(Math.floor(time5Km)),
      min: format(
        time5Km >= 1
          ? Math.floor((time5Km - Math.floor(time5Km)) * 60)
          : Math.floor(time5Km * 60),
      ),
      sec: format(Math.floor((time5Km * 60 - Math.floor(time5Km * 60)) * 60)),
    });
    setTime10km({
      hour: format(Math.floor(time10Km)),
      min: format(
        time10Km >= 1
          ? Math.floor((time10Km - Math.floor(time10Km)) * 60)
          : Math.floor(time10Km * 60),
      ),
      sec: format(Math.floor((time10Km * 60 - Math.floor(time10Km * 60)) * 60)),
    });
    setTimeHalf({
      hour: format(Math.floor(timeHalf)),
      min: format(
        timeHalf >= 1
          ? Math.floor((timeHalf - Math.floor(timeHalf)) * 60)
          : Math.floor(timeHalf * 60),
      ),
      sec: format(Math.floor((timeHalf * 60 - Math.floor(timeHalf * 60)) * 60)),
    });
    console.log(timeFull);
    setTimeFull({
      hour: format(Math.floor(timeFull)),
      min: format(
        timeFull >= 1
          ? Math.floor((timeFull - Math.floor(timeFull)) * 60)
          : Math.floor(timeFull * 60),
      ),
      sec: format(Math.floor((timeFull * 60 - Math.floor(timeFull * 60)) * 60)),
    });
  };

  useEffect(() => {
    getTime();
  }, [speed]);

  return (
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
            max={30}
            step={0.5}
            onValueChange={onChange}
          />
        </>

        <div className="flex flex-col gap-1">
          <FormDescription className="text-base">
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
            Half 기록: {timeHalf.hour}시간 {timeHalf.min}분 {timeHalf.sec}초
          </FormDescription>
          <FormDescription className="text-base">
            Full 기록: {timeFull.hour}시간 {timeFull.min}분 {timeFull.sec}초
          </FormDescription>
        </div>
      </form>
    </Form>
  );
}
