"use client";
import { usePathname } from "next/navigation";

type pathType = "/salary1" | "/salary2";

export default function Header() {
  const pathName = usePathname() as pathType;
  const title = {
    "/salary1": "연봉 인상률 계산기",
    "/salary2": "연봉 인상액 계산기",
    "/salary3": "2023년 실수령액 계산기",
  };

  return (
    <div className="flex h-16 items-center justify-center">
      <h1 className="text-center">{title[pathName]}</h1>
    </div>
  );
}
