"use client";
import {useState} from "react";
import NumericTextBox from "@/components/NumericTextBox";

export default function Home() {
        const [beforeSalary, setBeforeSalary] = useState('0');
        const [afterSalary, setAfterSalary] = useState('0');
        const [rate, setRate] = useState(0);

        const calcBtnClickHandler = () => {
            const before = Number(beforeSalary.replaceAll(',', ''));
            const after = Number(afterSalary.replaceAll(',', ''));

            if (before < 1 || after < 1) {
                alert("값을 입력해주세요.");
                return;
            }
            setRate(Number(((after - before) / before * 100).toFixed(2)));
        }
        const resetBtnClickHandler = () => {
            setBeforeSalary('0');
            setAfterSalary('0');
            setRate(0);
        }

        return (
        <>
            <div className="w-full">
                <form className="my-0 mx-auto" style={{width: "300px"}}>
                    <label className="mr-10">직전연봉</label>
                    <NumericTextBox value={beforeSalary} setValue={setBeforeSalary}/>
                    <span className="ml-1">원</span>
                    <label className="mr-10">현재연봉</label>
                    <NumericTextBox value={afterSalary} setValue={setAfterSalary}/>
                    <span className="ml-1">원</span>
                </form>
                <div className="my-0 mx-auto text-center" style={{width: "300px"}}>
                    <button onClick={resetBtnClickHandler} style={{width: "100px"}} className="border rounded-md p-1 text-center mr-1">초기화</button>
                    <button onClick={calcBtnClickHandler} style={{width: "100px"}} className="border rounded-md p-1 text-center bg-primary text-white">인상률 계산</button>
                </div>
                <div className="my-0 mx-auto text-center" style={{width: "300px"}}>
                    <p className="m-0 text-xl">인상률은 {rate}%입니다.</p>
                </div>
            </div>

        </>
    )
}