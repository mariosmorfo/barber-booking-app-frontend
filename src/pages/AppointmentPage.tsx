import React, { useEffect, useMemo, useState } from "react";
import { getToken } from "../utils/authTokenUtil";
import {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  type CreateAppointmentInput,
} from "../services/appointmentService";
import { getAllBarbers } from "../services/barberService";
import { SERVICES } from "../components/servicesData";
import Footer from "../components/Footer";

type Barber = {
  _id: string;
  firstname?: string;
  lastname?: string;
  username: string;
  role: "BARBER" | "ADMIN" | "CUSTOMER";
};

export default function AppointmentsPage() {
  const token = getToken();

  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [mine, setMine] = useState<any[]>([]);
  const [form, setForm] = useState<CreateAppointmentInput>({
    barberId: "",
    serviceName: "",
    dateTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const [selectedBarberId, setSelectedBarberId] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    if (!token) return;

    (async () => {
      try {
        setInitialLoading(true);

        const bs = await getAllBarbers();
        if (mounted) setBarbers(bs.slice(0, 3));

        const appts = await getMyAppointments(token, "self");
        if (mounted) setMine(appts);
      } catch (e: any) {
        if (mounted) setError(e?.message ?? "Failed to load appointments");
      } finally {
        if (mounted) setInitialLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token]);

  
  useEffect(() => {
    setForm((f) => ({ ...f, barberId: selectedBarberId }));
  }, [selectedBarberId]);

  const canSubmit = useMemo(
    () => !!form.barberId && !!form.serviceName && !!form.dateTime,
    [form]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !token) return;

    setLoading(true);
    setError(null);
    try {
      const payload: CreateAppointmentInput = {
        ...form,
        dateTime: new Date(form.dateTime).toISOString(),
      };
      await createAppointment(token, payload);

      const appts = await getMyAppointments(token, "self");
      setMine(appts);

      setForm({ barberId: "", serviceName: "", dateTime: "" });
      setSelectedBarberId("");
    } catch (e: any) {
      setError(e?.message ?? "Failed to create appointment");
    } finally {
      setLoading(false);
    }
  }

  async function onCancel(id: string) {
    if (!token) return;
    try {
      await cancelAppointment(token, id);
      const appts = await getMyAppointments(token, "self");
      setMine(appts);
    } catch (e: any) {
      setError(e?.message ?? "Failed to cancel appointment");
    }
  }

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-gray-600 mt-2">
          You need to be logged in to view and book appointments.
        </p>
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Make an Appointment</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Choose your barber</h2>
        {initialLoading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : barbers.length === 0 ? (
          <p className="text-gray-600">No barbers available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {barbers.map((b) => {
              const name =
                (b.firstname || b.username || "Barber") +
                (b.lastname ? ` ${b.lastname}` : "");
              const selected = selectedBarberId === b._id;
              return (
                <button
                  key={b._id}
                  type="button"
                  onClick={() => setSelectedBarberId(b._id)}
                  className={`text-left border rounded-2xl p-4 shadow-sm hover:shadow transition ${
                    selected
                      ? "ring-2 ring-blue-600 border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="font-semibold">
                        {name
                          .split(" ")
                          .map((s) => s[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-gray-500">Barber</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
      >
        <input type="hidden" value={form.barberId} />

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Service</label>
          <select
            value={form.serviceName}
            onChange={(e) =>
              setForm((f) => ({ ...f, serviceName: e.target.value }))
            }
            className="border rounded-lg px-3 py-2"
            required
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
                {s.duration ? ` • ${s.duration} min` : ""}
                {s.price ? ` • €${s.price}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Date & Time
          </label>
         <input
          type="datetime-local"
          value={form.dateTime}
          onChange={(e) => setForm((f) => ({ ...f, dateTime: e.target.value }))}
          className="border rounded-lg px-3 py-2"
          required
          min={new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16)}
          
        />

        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-60"
            title={!form.barberId ? "Please choose a barber above" : undefined}
          >
            {loading ? "Booking..." : "Book"}
          </button>
        </div>

        {error && (
          <p className="col-span-full text-red-600 text-sm">{error}</p>
        )}
      </form>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Appointments</h2>
          {initialLoading && (
            <span className="text-sm text-gray-500">Loading…</span>
          )}
        </div>

        {mine.length === 0 ? (
          <p className="text-gray-600">No appointments yet.</p>
        ) : (
          <ul className="divide-y">
            {mine.map((a: any) => {
              const barber = a.barberId;
              const barberName =
                (barber?.firstname || barber?.username || "Barber") +
                (barber?.lastname ? ` ${barber.lastname}` : "");
              const when = new Date(a.dateTime).toLocaleString();
              return (
                <li
                  key={a._id}
                  className="py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{a.serviceName}</p>
                    <p className="text-sm text-gray-600">
                      {barberName} • {when} • {a.status}
                    </p>
                  </div>
                  {a.status === "booked" && (
                    <button
                      onClick={() => onCancel(a._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
    <Footer/>
    </>
    
  );
}
