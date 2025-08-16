import React, { useEffect, useState } from "react";
import { findAllAppointmentsAdmin } from "../../services/appointmentService";
import type { AppointmentType } from "../../types/appointmentType";

export default function AppointmentsAdminPage() {
  const [rows, setRows] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const data = await findAllAppointmentsAdmin();

        const safeTime = (iso?: string) => {
          const t = iso ? Date.parse(iso) : NaN;
          return Number.isFinite(t) ? t : 0;
        };
        const sorted = [...data].sort((a, b) => safeTime(b.dateTime) - safeTime(a.dateTime));

        setRows(sorted);
      } catch (e) {
        console.error("Failed to load admin appointments:", e);
        setErr("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const personName = (p: AppointmentType["userId"]) => {
    if (!p) return "—";
    if (typeof p === "string") return p;
    const full =
      [p.firstname, p.lastname].filter(Boolean).join(" ").trim() ||
      p.username ||
      p._id;
    return full || "—";
  };

  const fmt = (iso?: string) => {
    if (!iso) return "—";
    const t = Date.parse(iso);
    if (!Number.isFinite(t)) return iso; 
    const d = new Date(t);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-3">All Appointments</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading…</p>
      ) : err ? (
        <p className="text-red-600 text-sm">{err}</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <ul className="divide-y rounded-2xl border space-y-1">
          {rows.map((a, idx) => {
            const key =
              (a as any)._id ??
              `${String(a.userId)}-${String(a.barberId)}-${a.dateTime}-${idx}`;

            return (
              <li key={key} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {personName(a.userId)} <span className="text-gray-500">→</span>{" "}
                      {personName(a.barberId)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {fmt(a.dateTime)} • {a.serviceName ?? "—"}
                      {a.status ? ` • ${a.status}` : ""}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
