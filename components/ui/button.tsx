import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'uppercase tracking-widest inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'hover:bg-slate-100',
				primary:
					'bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500/50 active:drop-shadow-lg border-b-0 active:border-b-4 transition',
				primaryOutline:
					'bg-white active:drop-shadow-lg text-sky-500 hover:bg-sky-50 transition',
				secondary:
					'bg-green-500 text-primary-foreground active:border-b-4 active:drop-shadow-lg hover:bg-green-500/90 border-green-600/30 border-b-0 active:border-b-4 transition',
				secondaryOutline:
					'bg-white active:drop-shadow-lg text-green-500 hover:bg-green-50 transition',
				danger:
					'bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600/50 active:border-b-4 active:drop-shadow-lg border-b-0 active:border-b-4 transition',
				dangerOutline:
					'bg-rose active:drop-shadow-lg text-rose-500 hover:bg-rose-50 transition',
				super:
					'bg-indigo-500 text-primary-foreground hover:bg-indigo500/90 border-indigo-600/50 border-b-0 active:border-b-4 active:border-b-4 active:drop-shadow-lg transition',
				superOutline:
					'active:drop-shadow-lg text-indigo-500 hover:bg-indigo-50 transition',
				ghost:
					'bg-transparent border-transparent text-slate-500 drop-shadow-lg bg-slate-100 active:drop-shadow-sm transition-none',
				aside:
					'bg-transparent border-transparent hover:bg-slate-100 active:bg-slate-100 drop-shadow-lg text-sky-600/80 active:drop-shadow-sm transition-none',
				asideOutline:
					'bg-transparent border-transparent active:drop-shadow-lg bg-slate-100 text-sky-600 border-2 border-sky-500/20 hover:border-sky-500/50 drop-shadow-sm transition-none',
			},
			size: {
				default: 'h-11 px-4 py-2',
				sm: 'h-9 px-3',
				lg: 'h-12 px-8',
				icon: 'h-10 w-10',
				rounded: 'rounded-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
