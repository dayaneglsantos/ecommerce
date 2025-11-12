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
            <div
                className={
                    "relative flex items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:border-primaryLight focus-within:ring-1 focus-within:ring-primaryLight " +
                    className
                }
            >
                <input
                    {...props}
                    type={type}
                    ref={localRef}
                    className={
                        "w-full px-4 py-2 bg-transparent border-none focus:ring-0 focus:border-0 outline-none " +
                        (icon ? "pr-10" : "")
                    }
                />

                {icon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);
