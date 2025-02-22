import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const iconButtonStyles = cva('inline-flex items-center justify-center');

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonStyles> {
  icon: ReactNode;
  'aria-label': string;
  title?: string;
}

export default function IconButton({
  icon,
  className,
  title,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={clsx(iconButtonStyles(), className)}
      title={title}
      {...props}
    >
      {icon}
    </button>
  );
}
