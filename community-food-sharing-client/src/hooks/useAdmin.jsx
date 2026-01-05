import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        // If auth is still loading, wait.
        if (loading) {
            return;
        }

        // If no user, definitely not admin.
        if (!user) {
            setIsAdmin(false);
            setIsAdminLoading(false);
            return;
        }

        const checkAdmin = async () => {
            setIsAdminLoading(true);
            try {
                const res = await fetch(`https://community-food-sharing-server-iota.vercel.app/users/${user.email}`);
                const data = await res.json();
                setIsAdmin(data?.role === "admin");
            } catch (error) {
                console.error("Failed to check admin status", error);
                setIsAdmin(false);
            } finally {
                setIsAdminLoading(false);
            }
        };

        checkAdmin();

    }, [user, loading]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;


