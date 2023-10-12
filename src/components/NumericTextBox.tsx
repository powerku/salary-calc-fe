"use client"
import {Input} from "@/components/ui/input";

type Props = {
    value: string
    setValue: Function
}

export default function NumericTextBox({value, setValue}: Props ) {

    const keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const formatValue = Number(e.currentTarget.value.replaceAll(',', ''))
            .toLocaleString('ko-KR');
        setValue(formatValue);
    }

    return (
        <>
            <Input type="text"
                   className="text-right px-1"
                   value={value}
                   onKeyUp={keyUpHandler}
                   onChange={(e) => setValue(e.target.value)}/>
        </>
    );
}