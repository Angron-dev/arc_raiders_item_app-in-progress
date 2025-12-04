import {ReactNode} from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string | null;
}
export default function Container({ children, className = null }: ContainerProps) {
    return (
        <div className={`container shadow-sm p-3 mb-5 bg-body rounded mt-4 ${className ?? ""}`}>
            {children}
        </div>
    );
}
