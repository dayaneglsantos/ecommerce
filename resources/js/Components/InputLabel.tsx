import { Tooltip } from 'react-tooltip';

interface InputLabelProps {
  value?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconText?: string;
  [key: string]: any;
}

export default function InputLabel({
  value,
  className = '',
  children,
  icon,
  iconText,
  ...props
}: InputLabelProps) {
  return (
    <label
      {...props}
      className={
        `flex items-center gap-1 text-sm font-medium text-gray-700 ` + className
      }
    >
      {value ? value : children}
      {icon && (
        <div data-tooltip-id={props.htmlFor}>
          {icon}
          {iconText && (
            <Tooltip
              id={props.htmlFor}
              place="top"
              content={iconText}
              className="!p-2 !text-[12px]"
            />
          )}
        </div>
      )}
    </label>
  );
}
