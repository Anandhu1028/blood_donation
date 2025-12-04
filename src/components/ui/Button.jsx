import { cn } from '../../lib/utils';

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled,
    ...props
}) {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',

        ghost: 'btn-ghost',

        // NEW VARIANTS
        success: 'bg-[#065F46] text-white hover:bg-[#064E3B]',// GREEN BUTTON
        'danger-outline': 'border border-red-500 text-red-500 hover:bg-red-50',   // RED OUTLINE
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={cn(
                'btn transition-colors duration-200 rounded-md',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
