"use client";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import NumericTextBox from "@/components/NumericTextBox";


const FormSchema = z.object({
    before: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    current: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export default function Home() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

        const [beforeSalary, setBeforeSalary] = useState<string | null>(null);
        const [afterSalary, setAfterSalary] = useState<string | null>(null);
        const [rate, setRate] = useState(0);

        const calcBtnClickHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault()

            if (beforeSalary === null || afterSalary === null) {
                return;
            }

            const before = Number(beforeSalary.replaceAll(',', ''));
            const after = Number(afterSalary.replaceAll(',', ''));

            if (before < 1 || after < 1) {
                alert("값을 입력해주세요.");
                return;
            }
            setRate(Number(((after - before) / before * 100).toFixed(2)));
    }
        const resetBtnClickHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();

            setBeforeSalary('0');
            setAfterSalary('0');
            setRate(0);
        }

    return (
        <div className="w-full">
            <Form {...form}>
                <form className="my-0 mx-auto" style={{width: "300px"}}>
                    <FormField
                        control={form.control}
                        name="before"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>직전연봉</FormLabel>
                                <FormControl>
                                    <NumericTextBox value={beforeSalary} setValue={setBeforeSalary}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="current"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>현재연봉</FormLabel>
                                <FormControl>
                                    <NumericTextBox value={afterSalary} setValue={setAfterSalary}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                <FormDescription>
                    인상률은 {rate}%입니다.
                </FormDescription>
                <FormMessage />
                <div className="my-0 mx-auto text-center" style={{width: "300px"}}>
                    <Button variant="ghost" onClick={resetBtnClickHandler} className="border mr-1">초기화</Button>
                    <Button onClick={calcBtnClickHandler} className="text-white">인상률 계산</Button>
                </div>
                </form>
            </Form>
        </div>
    );
}