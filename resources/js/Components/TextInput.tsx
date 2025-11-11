import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    className?: string;
    isFocused?: boolean;
    icon?: React.ReactNode;
}

export default forwardRef<HTMLInputElement | null, TextInputProps>(
    function TextInput(
        {
            type = "text",
            className = "",
            isFocused = false,
            icon = null,
            ...props
        }: TextInputProps,
        ref: React.ForwardedRef<HTMLInputElement | null>
    ) {
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => localRef.current as HTMLInputElement, [
            localRef,
        ]);

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <div className="relative">
                <input
                    {...props}
                    type={type}
                    className={
                        "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " +
                        className
                    }
                    ref={localRef}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {icon}
                </div>
            </div>
        );
    }
);
