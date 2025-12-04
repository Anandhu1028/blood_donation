import { getBloodGroupColor } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function BloodGroupBadge({ bloodGroup, size = 'md', className, animate = false }) {
    const sizes = {
        sm: 'w-12 h-12 text-sm',
        md: 'w-16 h-16 text-lg',
        lg: 'w-24 h-24 text-2xl',
        xl: 'w-28 h-28 text-3xl',
    };

    const badge = (
        <div
            className={cn(
                'blood-badge group cursor-pointer relative',
                sizes[size],
                className
            )}
        >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-gradient-shift blur-md" />
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <span className="drop-shadow-2xl font-black tracking-tight">{bloodGroup}</span>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12" />

            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/50 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
    );

    if (animate) {
        return (
            <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, 0],
                    y: -10,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                }}
            >
                {badge}
            </motion.div>
        );
    }

    return badge;
}
