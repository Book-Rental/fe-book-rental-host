function Loading() {
    return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 bg-transparent p-6">
            {/* Outer Wrapper for smooth layout placement */}
            <div className="relative flex items-center justify-center">
                {/* Animated Outer Pulse Ring */}
                <div className="absolute h-16 w-16 animate-ping rounded-full bg-blue-100 opacity-75 dark:bg-blue-900/30"></div>

                {/* Core Spinning Ring */}
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            </div>

            {/* Modern Context Text Layer */}
            <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide animate-pulse">
                    Loading Content
                </p>
              
            </div>
        </div>
    );
}

export default Loading;
