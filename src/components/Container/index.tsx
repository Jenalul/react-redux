import type { ReactNode } from "react";

interface MainProps {
    children: ReactNode;
}

export function Container({ children }: MainProps) {
    return (
        <main className="w-full min-h-[calc(100vh-4rem)] bg-gray-100 px-3 pt-4">
            <div className="max-w-7xl mx-auto">{children}</div>
        </main>
    );
}
