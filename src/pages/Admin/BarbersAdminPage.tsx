import React, { useEffect, useMemo, useState } from "react";
import {
  getAllBarbers,
  createBarber,
  deleteBarberByUsername,
  updateBarber,
  type BarberCreate,
  type ServiceItem,
  type BarberUpdate,
} from "../../services/barberService";
import EditBarberForm from "../../components/EditBarberForm";

export default function BarbersAdmin() {
  const [barbers, setBarbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");
  const [edit, setEdit] = useState<any | null>(null);
  const [q, setQ] = useState("");

  const [form, setForm] = useState<BarberCreate>({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    servicesOffered: [{ name: "Haircut", duration: 30, price: 20 }],
  });

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const rows = await getAllBarbers();
      setBarbers(rows);
    } catch (error) {
      setErr("Failed to load barbers");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  function setSvc(idx: number, patch: Partial<ServiceItem>) {
    setForm((f) => {
      const next = [...f.servicesOffered];
      next[idx] = { ...next[idx], ...patch };
      return { ...f, servicesOffered: next };
    });
  }
  function addSvc() {
    setForm((f) => ({
      ...f,
      servicesOffered: [...f.servicesOffered, { name: "", duration: 0, price: 0 }],
    }));
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
     if (form.password !== form.confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    try {
      await createBarber(form);
      setForm({
        firstname: "",
        lastname: "",
        username: "",
        phone: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: "",
        servicesOffered: [{ name: "Haircut", duration: 30, price: 20 }],
      });
      await load();
    } catch (error) {
      setErr("Failed to create barber");
    }
  }

  async function onDelete(username: string) {
    if (!confirm(`Delete barber "${username}"?`)) return;
    try {
      await deleteBarberByUsername(username);
      await load();
      alert("Barber deleted successfully!")
    } catch (error) {
      setErr("Failed to delete barber");
    }
  }

  async function saveBarberPatch(username: string, patch: BarberUpdate) {
    await updateBarber(username, patch);
    await load();
    setEdit(null);
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return barbers;
    return barbers.filter((b) => {
      const full = `${b.firstname ?? ""} ${b.lastname ?? ""}`.toLowerCase();
      return (
        (b.username ?? "").toLowerCase().includes(term) ||
        full.includes(term)
      );
    });
  }, [barbers, q]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Barbers</h2>
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
          <p className="text-gray-600">No barbers found.</p>
        ) : (
          <ul className="divide-y rounded-2xl border">
            {filtered.map((b) => (
              <li key={b._id ?? b.username} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {(b.firstname || b.username) +
                        (b.lastname ? ` ${b.lastname}` : "")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {b.username} • {b.email}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEdit(b)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(b.username)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {edit?.username === b.username && (
                  <div className="mt-3 rounded-xl border p-3">
                    <EditBarberForm
                      barber={b}
                      onSubmit={(patch) => saveBarberPatch(b.username, patch)}
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
        <h2 className="text-xl font-semibold mb-3">Add Barber</h2>
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
              placeholder="Age"
              className="border rounded-lg px-3 py-2"
              value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-3 py-2 w-full"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="border rounded-lg px-3 py-2 w-full"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((f) => ({ ...f, confirmPassword: e.target.value }))
            }
          />

          <div className="space-y-2">
            <p className="font-medium">Services</p>
            {form.servicesOffered.map((s, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  placeholder="Name"
                  className="border rounded-lg px-3 py-2"
                  value={s.name}
                  onChange={(e) => setSvc(i, { name: e.target.value })}
                />
                <input
                  placeholder="Duration (min)"
                  type="number"
                  min={1}
                  className="border rounded-lg px-3 py-2"
                  value={s.duration}
                  onChange={(e) => setSvc(i, { duration: Number(e.target.value) })}
                />
                <input
                  placeholder="Price (€)"
                  type="number"
                  className="border rounded-lg px-3 py-2"
                  value={s.price}
                  onChange={(e) => setSvc(i, { price: Number(e.target.value) })}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSvc}
              className="text-sm text-blue-600"
            >
              + Add service
            </button>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Create Barber
          </button>
        </form>
      </div>
    </div>
  );
}
