import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser, isAdmin } from "@/services/UserManagementService";

interface AdminRouteGuardProps {
  children: ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const currentUser = getCurrentUser();
      if (currentUser && isAdmin(currentUser)) {
        setAuthorized(true);
      }
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}