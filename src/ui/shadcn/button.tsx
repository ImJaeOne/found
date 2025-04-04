import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/lib/cn';

/**
 * @example 기본 버튼
 *  <Button>default</Button>
 *
 * @example 파란 배경 흰 글씨 버튼
 *  <Button variant="button" size="button">variant, size = button</Button>
 *
 * @example 라벨
 *  <Button variant="label" size="label">variant, size = label</Button>
 *
 * @example 흰 배경 노란 글씨 버튼
 *  <Button variant="subbutton" size="subbuton">variant, size = subbutton</Button>
 *
 * @example Slot을 사용하는 버튼
 *  <Button asChild><Link href="/home">Home</Link></Button>
 *
 * @prop { 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'button' | 'subbutton' | 'label' | 'logo' } variant - 버튼의 스타일
 * @prop { 'default' | 'label' | 'button' | 'subbutton' | 'logo' | 'icon' } size - 버튼의 크기
 * @prop { boolean } [asChild=false]
 * @prop { string } [className]
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        button: 'bg-main1 !text-title-sm text-light-gray',
        subbutton: 'bg-white border !border-sub1 text-sub1',
        label:
          'bg-sub1-30 !text-text-md text-black font-bold border-sub1 border-2 pointer-events-none',
        logo: 'bg-main1 text-light-gray',
      },
      size: {
        default: 'px-2 py-2',
        label: 'px-5 py-1 rounded-full',
        button: 'px-8 py-3 rounded-2xl',
        subbutton: 'px-9 py-2 rounded-2xl',
        logo: 'px-8 py-5 rounded-2xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const labelText = variant === 'label' ? `# ${children}` : children;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {labelText}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
