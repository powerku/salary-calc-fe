"use client"
import styles from "@/app/increaseRate/style.module.css";
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
                   value={value}
                   onKeyUp={keyUpHandler}
                   onChange={(e) => setValue(e.target.value)}/>
        </>
    );
}