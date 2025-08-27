import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAppointmentsByBarber,
  cancelAppointment,
  updateAppointmentStatus,
} from "../../services/appointmentService";
import type { AppointmentType } from "../../types/appointmentType";

export default function BarberAppointmentsPage() {
  const { token, userId } = useAuth();
  const [rows, setRows] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    if (!token || !userId) return;
    setLoading(true);
    setErr("");
    try {
      const data = await getAppointmentsByBarber(userId);
      const sorted = [...data].sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      setRows(sorted);
    } catch {
      setErr("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [token, userId]);

  function personName(p: AppointmentType["userId"]) {
    if (!p) return " ";
    if (typeof p === "string") return p;
    const full =
      [p.firstname, p.lastname].filter(Boolean).join(" ").trim() ||
      p.username ||
      p._id;
    return full || " ";
  }

  function fmt(dt: string) {
    const d = new Date(dt);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  async function onCancel(id: string) {
    if (!token) return;
    if (!confirm("Cancel this appointment?")) return;
    try {
      await cancelAppointment(id);
      await load();
    } catch {
      alert("Failed to cancel appointment");
    }
  }

  async function onComplete(id: string) {
    if (!token) return;
    try {
      await updateAppointmentStatus(id, "completed");
      await load();
    } catch {
      alert("Failed to update status");
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-3 bg-blue-600 px-3 py-2 rounded-lg text-white max-w-50">My Appointments</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading…</p>
      ) : err ? (
        <p className="text-red-600 text-sm">{err}</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <ul className="divide-y rounded-2xl border">
          {rows.map((a) => (
            <li
              key={a._id}
              className="p-4 flex items-center justify-between flex-wrap gap-2"
            >
              <div>
                <p className="font-medium">
                  Customer: {personName(a.userId)}
                </p>
                <p className="text-sm text-gray-600">
                  {fmt(a.dateTime)} • {a.serviceName} • {a.status}
                </p>
              </div>
              <div className="flex gap-3">
                {a.status === "booked" && (
                  <>
                    <button
                      onClick={() => onComplete(a._id!)}
                      className="text-green-600 hover:text-green-700"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() => onCancel(a._id!)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
