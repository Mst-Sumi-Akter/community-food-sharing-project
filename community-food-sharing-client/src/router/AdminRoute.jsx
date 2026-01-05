import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Spinner from "../components/Spinner"; // Assuming Spinner exists, if not I'll use simple text

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                {/* Simple Loading Spinner Fallback */}
                <span className="loading loading-spinner loading-lg text-orange-500"></span>
            </div>
        );
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;


