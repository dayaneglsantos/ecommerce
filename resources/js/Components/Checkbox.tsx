interface CheckboxProps {
    className?: string;
    [key: string]: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
    className = "",
    onChange,
    ...props
}: CheckboxProps) {
    return (
        <input
            {...props}
            onChange={onChange}
            type="checkbox"
            className={
                "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                className
            }
        />
    );
}
