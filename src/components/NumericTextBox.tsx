"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function NumericTextBox({ field }: any) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(field.value);
  }, [field]);

  const onChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    let str = inputValue.replaceAll(",", "");
    setValue(str);
    field.onChange(str);
  };

  const setFormat = (value: string) => {
    if (value === "") {
      return "";
    }

    return Number(value).toLocaleString("ko-KR");
  };

  return (
    <>
      <Input
        type="text"
        className="px-1 text-right"
        {...field}
        value={setFormat(value)}
        onChange={onChange}
      />
    </>
  );
}
