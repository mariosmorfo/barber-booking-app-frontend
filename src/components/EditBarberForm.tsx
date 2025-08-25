import React, { useState } from "react";
import type { ServiceItem, BarberUpdate } from "../services/barberService";

type Props = {
  barber: any;
  onSubmit: (patch: BarberUpdate) => Promise<void>;
  onCancel: () => void;
};

export default function EditBarberForm({ barber, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<BarberUpdate>({
    firstname: barber.firstname ?? "",
    lastname: barber.lastname ?? "",
    email: barber.email ?? "",
    phone: barber.phone ?? "",
    age: barber.age ?? "",
    servicesOffered: barber.servicesOffered ?? [],
    password: "",
  });

  function setSvc(i: number, patch: Partial<ServiceItem>) {
    setForm(f => {
      const next = [...(f.servicesOffered ?? [])];
      next[i] = { ...next[i], ...patch } as ServiceItem;
      return { ...f, servicesOffered: next };
    });
  }

  function addSvc() {
    setForm(f => ({ ...f, servicesOffered: [...(f.servicesOffered ?? []), { name: "", duration: 0, price: 0 }] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.password) delete (payload as any).password;
    await onSubmit(payload);
    alert("Barber updated successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border rounded-lg px-3 py-2" placeholder="Firstname"
          value={form.firstname ?? ""} onChange={e => setForm(f => ({ ...f, firstname: e.target.value }))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Lastname"
          value={form.lastname ?? ""} onChange={e => setForm(f => ({ ...f, lastname: e.target.value }))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Email"
          value={form.email ?? ""} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Phone"
          value={form.phone ?? ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Age"
          value={form.age ?? ""} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
      </div>

      <input className="border rounded-lg px-3 py-2 w-full" type="password" placeholder="New password (optional)"
        value={(form as any).password ?? ""} onChange={e => setForm(f => ({ ...f, password: e.target.value as any }))} />

      <div className="space-y-2">
        <p className="font-medium">Services</p>
        {(form.servicesOffered ?? []).map((s, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input className="border rounded-lg px-3 py-2" placeholder="Name"
              value={s.name} onChange={e => setSvc(i, { name: e.target.value })} />
            <input className="border rounded-lg px-3 py-2" placeholder="Duration (min)" type="number" min={1}
              value={s.duration} onChange={e => setSvc(i, { duration: Number(e.target.value) })} />
            <input className="border rounded-lg px-3 py-2" placeholder="Price (€)" type="number" min={0}
              value={s.price} onChange={e => setSvc(i, { price: Number(e.target.value) })} />
          </div>
        ))}
        <button type="button" onClick={addSvc} className="text-sm text-blue-600">+ Add service</button>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg">Cancel</button>
      </div>
    </form>
  );
}
