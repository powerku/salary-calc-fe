"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getServerTime } from "@/api/time";

const FormSchema = z.object({
  url: z.string().min(1, {
    message: "URL을 입력하세요.",
  }),
});

const ServerTime = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  const [submitTime, setSubmitTime] = useState<Date>();
  const [url, setUrl] = useState<string>("");
  const [localTime, setLocalTime] = useState<Date>();
  const [serverTime, setServerTime] = useState<Date>();
  const [currentServerTime, setCurrentServerTime] = useState<Date>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updateServerTime = () => {
      if (!serverTime || !submitTime) {
        return;
      }

      const timeDiff = new Date().getTime() - submitTime?.getTime();
      setCurrentServerTime(new Date(serverTime?.getTime() + timeDiff));
    };

    const intervalId = setInterval(updateServerTime, 1000);

    return () => clearInterval(intervalId);
  }, [currentServerTime, serverTime, submitTime]);

  const formatLocalTime = localTime?.toLocaleString();
  const formatServerTime = currentServerTime?.toLocaleString();

  const onSubmit = async ({ url }: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    const { result } = await getServerTime(url);
    setUrl(url);
    setSubmitTime(new Date());
    setServerTime(new Date(result));
    setCurrentServerTime(new Date(result));

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        className="mx-auto my-0 w-[300px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="px-1"
                  placeholder="URL을 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-400" />
            </FormItem>
          )}
        />
        <div
          className="mx-auto my-3 flex justify-center gap-1 text-center"
          style={{ width: "300px" }}
        >
          <Button
            type="submit"
            className="bg-primary text-primary-foreground"
            disabled={isLoading}
          >
            조회
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <p>내 컴퓨터 시간:</p>
          <p>{formatLocalTime}</p>
          <p>서버 시간: </p>
          <p>
            <strong>{formatServerTime}</strong>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default ServerTime;
