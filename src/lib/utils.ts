import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function format(num: number | string) {
  if (typeof num === "string") {
    num = Number(num);
  }
  return num.toLocaleString("ko-KR");
}
