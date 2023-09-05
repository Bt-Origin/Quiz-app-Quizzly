import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import { useData } from '../UserContext';

function Report() {
    const { data } = useData();
    console.log("data", data)

    return (
        <>
            <div className='flex justify-center pt-[100px] '>
                <table className='bg-[#f4f7f5ba]'>
                    <tr>
                        <th className='pl-[100px] head'>Questions</th>
                        <th className='head'>Answers</th>
                    </tr>
                    {data?.userSelected.map((e) => {
                        return (
                            <tr >
                                <td className='h-[20px]'>{e?.Question}</td>
                                <td className=''>{e?.Answer}</td>
                            </tr>
                        )
                    })}

                </table>
                <table className='bg-[#f4f7f5ba]'>
                    <tr>
                        <th className='head'>Correct Answer</th>
                    </tr>
                    {data?.userData.map((e) => {
                        return (
                            <tr >
                                <td className='answer bg-[#0adf3a9c]' >{e?.correct_answer}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>

        </>

    )
}

export default Report;