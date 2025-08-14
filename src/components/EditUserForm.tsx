import React, { useState } from "react";
import type { UserType } from "../types/userType";

type Props = {
  user: UserType;
  onSubmit: (patch: Partial<UserType>) => Promise<void>;
  onCancel: () => void;
};

export default function EditUserForm({ user, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Partial<UserType>>({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    age: user.age,
    role: user.role,
    password: "", 
  } as any);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload?.password) delete (payload as any).password;
      await onSubmit(payload);
    } catch (e: any) {
      setErr(e?.message ?? "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border rounded-lg px-3 py-2" placeholder="First name"
          value={form.firstname ?? ""} onChange={e => setForm(f => ({ ...f, firstname: e.target.value }))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Last name"
          value={form.lastname ?? ""} onChange={e => setForm(f => ({ ...f, lastname: e.target.value }))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Email"
          value={form.email ?? ""} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Phone"
          value={form.phone ?? ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Age"
          value={form.age ?? ""} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
        <select className="border rounded-lg px-3 py-2"
          value={form.role ?? "CUSTOMER"} onChange={e => setForm(f => ({ ...f, role: e.target.value as any }))}>
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="BARBER">BARBER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <input className="border rounded-lg px-3 py-2 w-full" type="password" placeholder="New password (optional)"
        value={(form as any).password ?? ""} onChange={e => setForm(f => ({ ...f, password: e.target.value as any }))} />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          {loading ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg">Cancel</button>
      </div>
    </form>
  );
}
