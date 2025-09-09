import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...props }: InputProps) {
    return (
        <input
            className="w-full bg-white px-2.5 py-2 rounded-md outline-none hover:ring hover:ring-blue-400 focus:ring-2 focus:ring-blue-500 transition-all"
            {...props}
        />
    );
}
