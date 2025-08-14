import React, { useEffect, useState } from "react";
import { getAllUsers, getUserByUsername, deleteUserByUsername, updateUser } from "../../services/userService";
import type { UserType } from "../../types/userType";
import EditUserForm from "../../components/EditUserForm";

export default function UsersAdmin() {
  const [all, setAll] = useState<UserType[]>([]);
  const [one, setOne] = useState<UserType | null>(null);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const [editUser, setEditUser] = useState<UserType | null>(null);

  async function loadAll() {
    setErr("");
    try {
      const users = await getAllUsers();
      setAll(users);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load users");
    }
  }
  useEffect(() => { loadAll(); }, []);

  async function search() {
    setErr("");
    setOne(null);
    if (!q.trim()) return;
    try {
      const u = await getUserByUsername(q.trim());
      setOne(u);
    } catch (e: any) {
      setErr(e?.message ?? "User not found");
    }
  }

  async function onDelete(username: string) {
    if (!confirm(`Delete user "${username}"?`)) return;
    try {
      await deleteUserByUsername(username);
      await loadAll();
      if (one?.username === username) setOne(null);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to delete user");
    }
  }

  async function saveUserPatch(username: string, patch: Partial<UserType>) {
    await updateUser(username, patch); 
    await loadAll();
    setEditUser(null);
    if (one && one.username === username) {
      const updated = await getUserByUsername(username);
      setOne(updated);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-3">Find a User</h2>
        <div className="flex gap-2 mb-3">
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Enter username…" className="border rounded-lg px-3 py-2 flex-1" />
          <button onClick={search} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Search</button>
        </div>

        {one && !editUser && (
          <div className="rounded-2xl border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{one.firstname} {one.lastname}</p>
                <p className="text-sm text-gray-600">{one.username} • {one.email}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setEditUser(one)} className="text-blue-600 hover:text-blue-700">Edit</button>
                <button onClick={() => onDelete(one.username)} className="text-red-600 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>
        )}

        {editUser && (
          <div className="rounded-2xl border p-4 mt-3">
            <h3 className="font-semibold mb-2">Edit: {editUser.username}</h3>
            <EditUserForm
              user={editUser}
              onSubmit={(patch) => saveUserPatch(editUser.username, patch)}
              onCancel={() => setEditUser(null)}
            />
          </div>
        )}

        {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
      </div>
    </div>
  );
}
