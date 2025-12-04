import { Droplet } from 'lucide-react';

export function Loader({ size = 'md', fullScreen = false }) {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    const loader = (
        <div className="flex flex-col items-center justify-center gap-4">
            <Droplet className={`${sizes[size]} text-blood animate-bounce`} />
            <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-50">
                {loader}
            </div>
        );
    }

    return loader;
}
