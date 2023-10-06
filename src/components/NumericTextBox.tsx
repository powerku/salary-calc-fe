"use client"
import styles from "@/app/increaseRate/style.module.css";

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
            <input type="text" id="before" className="mb-5 border rounded-md text-right px-1"
                   style={{width: "calc(100% - 114px)",}}
                   value={value}
                   onKeyUp={keyUpHandler}
                   onChange={(e) => setValue(e.target.value)}/>
        </>
    )
}