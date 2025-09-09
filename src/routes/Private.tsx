import { useEffect, useState, type ReactNode } from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps) {
    const { user } = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState<boolean>(true);
    const [signed, setSigned] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setLoading(false);
            setSigned(true);
        } else {
            setLoading(false);
            setSigned(false);
        }
    }, [user]);

    if (loading) return null;

    if (!signed) return <Navigate to="/" />;

    return <>{children}</>;
}
