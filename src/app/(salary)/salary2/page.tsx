"use client";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import NumericTextBox from "@/components/NumericTextBox";


const FormSchema = z.object({
    current: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    percent: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export default function Home() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const [current, setCurrent] = useState('0');
    const [rate, setRate] = useState('0');
    const [result, setResult] = useState('0');

    const calcBtnClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const currentSalary = Number(current.replaceAll(',', ''));
        const increaseRate = Number(rate.replaceAll(',', ''));

        if (currentSalary < 1 || increaseRate < 1) {
            alert("값을 입력해주세요.");
            return;
        }
        setResult((currentSalary + (currentSalary * increaseRate / 100)).toLocaleString('ko-KR'));
    }
    const resetBtnClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        setCurrent('0');
        setRate('0');
        setResult('0');
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form className="my-0 mx-auto" style={{width: "300px"}}>
                    <FormField
                        control={form.control}
                        name="current"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>현재 연봉</FormLabel>
                                <FormControl>
                                    <NumericTextBox value={current} setValue={setCurrent}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="current"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>인상률(%)</FormLabel>
                                <FormControl>
                                    <NumericTextBox value={rate} setValue={setRate}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormDescription>
                        인상된 연봉은 {result}원 입니다.
                    </FormDescription>
                    <FormMessage />
                    <div className="my-0 mx-auto text-center" style={{width: "300px"}}>
                        <Button variant="ghost" onClick={resetBtnClickHandler} className="border mr-1">초기화</Button>
                        <Button onClick={calcBtnClickHandler} className="text-white">인상액 계산</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}