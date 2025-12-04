import { cn } from '../../lib/utils';

export function Card({ children, className, hover = false, ...props }) {
    return (
        <div
            className={cn('card', hover && 'card-hover', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className, ...props }) {
    return (
        <div className={cn('p-6 border-b border-gray-200 dark:border-gray-800', className)} {...props}>
            {children}
        </div>
    );
}

export function CardBody({ children, className, ...props }) {
    return (
        <div className={cn('p-6', className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className, ...props }) {
    return (
        <div className={cn('p-6 border-t border-gray-200 dark:border-gray-800', className)} {...props}>
            {children}
        </div>
    );
}
