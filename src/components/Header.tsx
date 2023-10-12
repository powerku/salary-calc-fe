"use client";
import {usePathname} from "next/navigation";

type pathType = '/salary1' | '/salary2';

export default function Header() {
    const pathName = usePathname() as pathType;
    const title = {
        '/salary1': '연봉 인상률 계산기',
        '/salary2': '연봉 인상액 계산기',
    }

    return (<div className="h-16 flex justify-center items-center">
        <h1 className="text-center">{title[pathName]}</h1>
    </div>)
}