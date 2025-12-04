import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'default', className, ...props }) {
    const variants = {
        default: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        info: 'badge-info',
    };

    return (
        <span className={cn('badge', variants[variant], className)} {...props}>
            {children}
        </span>
    );
}
