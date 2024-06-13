"use client";

import cx from "classnames";
import Image from "next/image";
import React from "react";

interface InputProps {
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rightIcon?: string | React.ReactNode;
    isFull?: boolean;
    className?: string;
    onRightIconClick?: () => void;
    isRightIconClickable?: boolean;
    initialValue?: string;
}

export default function Input({
    placeholder,
    onChange = () => null,
    rightIcon,
    isFull = false,
    className,
    onRightIconClick = () => null,
    initialValue = "",
    isRightIconClickable = false,
}: InputProps) {
    return (
        <label className={cx(
            "input input-bordered flex items-center gap-2",
            className,
            {
                'w-full': isFull,
                'h-28': isFull,
                'rounded-full': isFull,
                'px-10': isFull,
            }
        )}>
            <input value={initialValue} type="text" className={cx("myInput grow w-full rounded-full",
                {
                    'h-full': isFull,
                    'font-medium': isFull,
                    'text-3xl': isFull,
                }
            )} placeholder={placeholder} onChange={onChange} />
            {rightIcon && (
                typeof rightIcon === "string" ? <Image
                    onClick={onRightIconClick}
                    src={rightIcon}
                    width={30}
                    height={30}
                    alt="right"
                    className={cx({
                        'cursor-pointer': isRightIconClickable,
                    })}
                /> : rightIcon
            )}
        </label>
    );
}