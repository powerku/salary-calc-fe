"use client";
import { usePathname } from "next/navigation";

type pathType = "/salary1" | "/salary2";

export default function Header() {
  const pathName = usePathname() as pathType;
  const title = {
    "/salary1": "연봉 인상률 계산기",
    "/salary2": "연봉 인상액 계산기",
    "/salary3": "2024년 실수령액 계산기",
    "/speed1": "속도별 페이스 계산기",
    "/server-time": "서버 시간 확인기",
  };

  return (
    <div className="flex h-16 items-center justify-center">
      <h3 className="text-center text-2xl font-semibold">{title[pathName]}</h3>
    </div>
  );
}
