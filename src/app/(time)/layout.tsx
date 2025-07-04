import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CaretRightIcon } from "@radix-ui/react-icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "서버 시간 확인기",
  description: "서버 시간 확인기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="hidden md:flex md:flex-1"></div>
      <main className="mb-5 md:flex-1">
        <Header />
        {children}
      </main>
      <aside className="flex flex-1 flex-col justify-start md:flex">
        <ScrollArea className="h-fit w-48 rounded-md ">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              연봉 계산기
            </h4>
            <div key="salary1" className="text-sm">
              <Link href="/salary1" className="flex">
                <CaretRightIcon className="my-auto mr-2 h-4 w-4" />
                연봉 인상률 계산기
              </Link>
            </div>
            <Separator className="my-2" />
            <div key="salary2" className="text-sm">
              <Link href="/salary2" className="flex">
                <CaretRightIcon className="my-auto mr-2 h-4 w-4" />
                연봉 인상액 계산기
              </Link>
            </div>
            <Separator className="my-2" />
            <div key="salary3" className="text-sm">
              <Link href="/salary3" className="flex">
                <CaretRightIcon className="my-auto mr-2 h-4 w-4" />실 수령액
                계산기
              </Link>
            </div>
          </div>
        </ScrollArea>
        <ScrollArea className="h-fit w-48 rounded-md ">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              속도 계산기
            </h4>
            <div key="speed1" className="text-sm">
              <Link href="/speed1" className="flex">
                <CaretRightIcon className="my-auto mr-2 h-4 w-4" />
                속도별 페이스 계산기
              </Link>
            </div>
          </div>
        </ScrollArea>
        <ScrollArea className="h-fit w-48 rounded-md ">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">서버 시간</h4>
            <div key="server-time" className="text-sm">
              <Link href="/server-time" className="flex">
                <CaretRightIcon className="my-auto mr-2 h-4 w-4" />
                서버 시간 확인기
              </Link>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
