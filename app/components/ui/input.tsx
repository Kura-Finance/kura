import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus-visible:border-[#8B5CF6]/60 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
