import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="m-auto w-[300px]">
      <ScrollArea className="h-full w-48 rounded-md ">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">연봉 계산기</h4>
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
          <Separator className="my-2" />
          <h4 className="mb-4 text-sm font-medium leading-none">속도 계산기</h4>
          <div key="spped1" className="text-sm">
            <Link href="/speed1" className="flex">
              <CaretRightIcon className="my-auto mr-2 h-4 w-4" />
              속도별 페이스 계산기
            </Link>
          </div>
          <Separator className="my-2" />
          <h4 className="mb-4 text-sm font-medium leading-none">
            서버 시간 확인기
          </h4>
          <div key="server-time" className="text-sm">
            <Link href="/server-time" className="flex">
              <CaretRightIcon className="my-auto mr-2 h-4 w-4" />
              서버 시간 확인기
            </Link>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}
