import React, { useEffect, useMemo, useState } from "react";
import {
  getAllUsers,
  registerUser,
  deleteUserByUsername,
  updateUser,
  type UserCreate,
} from "../../services/userService";
import type { UserType } from "../../types/userType";
import EditUserForm from "../../components/EditUserForm";

export default function UsersAdmin() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");
  const [edit, setEdit] = useState<UserType | null>(null);

  
  const [q, setQ] = useState("");

  
  const [form, setForm] = useState<UserCreate>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    age: "",      
    address: { city: "", street: "" },       
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
   
  });

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const rows = await getAllUsers();
      setUsers(rows);
    } catch {
      setErr("Failed to load users");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

 
  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (form.password !== form.confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    try {
      await registerUser(form);
      setForm({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        phone: "",
        age: "",
        address: { city: "", street: "" },
        password: "",
        confirmPassword: "",
        role: "CUSTOMER",
      });
      await load();
    } catch {
      setErr("Failed to create user");
    }
  }

  async function onDelete(username: string) {
    if (!confirm(`Delete user "${username}"?`)) return;
    try {
      await deleteUserByUsername(username);
      await load();
      alert("User deleted successfully!")
    } catch {
      setErr("Failed to delete user");
    }
  }

  async function saveUserPatch(username: string, patch: Partial<UserType>) {
    try {
      await updateUser(username, patch);
      await load();
      setEdit(null);
    } catch {
      setErr("Failed to update user");
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;
    return users.filter((u) => {
      const full = `${u.firstname ?? ""} ${u.lastname ?? ""}`.toLowerCase();
      return (u.username ?? "").toLowerCase().includes(term) || full.includes(term);
    });
  }, [users, q]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Users</h2>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by username or name…"
            className="border rounded-lg px-3 py-2 w-full"
          />
          {q && (
            <button
              className="text-sm px-3 rounded-lg border"
              onClick={() => setQ("")}
              type="button"
            >
              Clear
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <ul className="divide-y rounded-2xl border">
            {filtered.map((u) => (
              <li key={u._id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {(u.firstname || u.username) + (u.lastname ? ` ${u.lastname}` : "")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {u.username} • {u.email}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEdit(u)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(u.username)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {edit?.username === u.username && (
                  <div className="mt-3 rounded-xl border p-3">
                    <EditUserForm
                      user={u}
                      onSubmit={(patch) => saveUserPatch(u.username, patch)}
                      onCancel={() => setEdit(null)}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {err && <p className="text-sm text-red-600 mt-3">{err}</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Add User</h2>
        <form onSubmit={onCreate} className="space-y-3 rounded-2xl border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder="Firstname"
              className="border rounded-lg px-3 py-2"
              value={form.firstname}
              onChange={(e) => setForm((f) => ({ ...f, firstname: e.target.value }))}
            />
            <input
              placeholder="Lastname"
              className="border rounded-lg px-3 py-2"
              value={form.lastname}
              onChange={(e) => setForm((f) => ({ ...f, lastname: e.target.value }))}
            />
            <input
              placeholder="Username"
              className="border rounded-lg px-3 py-2"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            />
            <input
              placeholder="Email"
              className="border rounded-lg px-3 py-2"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            <input
              placeholder="Phone"
              className="border rounded-lg px-3 py-2"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
            <input
              placeholder="Age (string)"
              className="border rounded-lg px-3 py-2"
              value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
            />

           <input
              placeholder="City"
              className="border rounded-lg px-3 py-2"
              value={form.address?.city ?? ""}
              onChange={(e) =>setForm(f => ({...f,address: { ...(f.address ?? {}), city: e.target.value}}))
              }
            />

           <input
              placeholder="Street"
              className="border rounded-lg px-3 py-2"
              value={form.address?.street ?? ""}
              onChange={(e) =>setForm(f => ({...f,address: { ...(f.address ?? {}), street: e.target.value}}))
              }
            />
          
            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg px-3 py-2"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="border rounded-lg px-3 py-2"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm((f) => ({ ...f, confirmPassword: e.target.value }))
              }
            />
           </div>

          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
