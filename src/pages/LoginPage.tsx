import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { loginSchema, type LoginCredentials } from "../types/loginType";
import { loginUser } from "../services/loginService";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginCredentials>({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showPwd, setShowPwd] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }

    setLoading(true);
    try {
      const token = await loginUser(parsed.data);
      login(token);
      navigate("/");
    } catch (err: any) {
      setError(err?.message ?? "Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
      <div className="container mx-auto px-4 mt-5 mb-5">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
            <p className="text-center text-gray-500 mb-8">
              Sign in to book services and manage your appointments.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-gray-700 mb-1 font-medium">Username</label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={onChange}
                  autoComplete="username"
                  className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPwd ? "text" : "password"}
                    value={form.password}
                    onChange={onChange}
                    autoComplete="current-password"
                    className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 text-blue-600 hover:text-blue-700"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in…" : "Login"}
              </button>

              <p className="text-center text-gray-600">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}
