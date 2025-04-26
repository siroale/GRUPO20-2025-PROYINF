import { useState } from "react";
import { AdminRouteGuard } from "@/components/layout/AdminRouteGuard";
import { UserList } from "@/components/ui/UserList";
import { CreateUserForm } from "@/components/layout/CreateUserForm";

export default function AdminPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleUserCreated = () => {
    setShowCreateForm(false);
  };

  return (
    <AdminRouteGuard>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
        
        {showCreateForm ? (
          <div className="bg-gray-50 border rounded-lg p-6 mb-8">
            <CreateUserForm
              onSuccess={handleUserCreated}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        ) : (
          <UserList onCreateUser={() => setShowCreateForm(true)} />
        )}
      </div>
    </AdminRouteGuard>
  );
}