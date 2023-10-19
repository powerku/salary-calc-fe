"use client";
import { Input } from "@/components/ui/input";

type Props = {
  value?: string | null | undefined;
  setValue: Function;
};

export default function NumericTextBox({ value, setValue }: Props) {
  const keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let inputValue = e.currentTarget.value.replaceAll(",", "");
    inputValue = inputValue.replace(/[^0-9]/g, "");

    const formatValue = Number(inputValue).toLocaleString("ko-KR");
    setValue(formatValue);
  };

  return (
    <>
      <Input
        type="text"
        className="px-1 text-right"
        value={value || ""}
        onKeyUp={keyUpHandler}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
