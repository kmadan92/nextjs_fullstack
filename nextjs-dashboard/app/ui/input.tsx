'use client'
import clsx from "clsx"
import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label:string,
    labelClassname: string
    inputClassname: string
}

function Input(
    {label, labelClassname,id,inputClassname,...rest}:InputProps,
    ref:React.Ref<HTMLInputElement>
)
{
    const inputId = id || React.useId()

    return(
        <>
        {
            label && (
                <label 
                htmlFor={inputId}
                className={labelClassname}
                >
                {label}
                </label>
            )
           
        }
        <input 
        id={inputId}
        ref={ref}
        className={clsx(
  'h-10 rounded-lg border border-gray-300 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  inputClassname
)}
        {...rest}
        />
        </>
    )
}

Input.displayName = 'Input';
export default React.forwardRef<HTMLInputElement, InputProps>(Input);