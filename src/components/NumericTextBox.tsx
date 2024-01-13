"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function NumericTextBox({ field }: any) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(field.value);
  }, [field]);

  const setFormat = (value: string) => {
    if (value === "") {
      return "";
    }
    if (value.lastIndexOf(".") === value.length - 1) {
      return value;
    }

    return Number(value).toLocaleString("ko-KR");
  };

  const onChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let inputValue = e.currentTarget.value;
    inputValue = inputValue.replace(/[^0-9.]/g, "");
    let str = inputValue.replaceAll(",", "");

    setValue(str);
    field.onChange(str);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {};

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
