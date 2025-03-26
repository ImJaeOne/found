import * as React from 'react';
import { cn } from '@/utils/lib/cn';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border  bg-background pl-2 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:opacity-50 md:text-sm',
        'focus:border-blue-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
