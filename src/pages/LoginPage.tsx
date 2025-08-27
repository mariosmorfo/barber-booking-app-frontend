import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { loginUser, loginBarber } from "../services/loginService";
import type { DecodedToken } from "../types/tokenType";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [loginAsBarber, setLoginAsBarber] = useState(false); 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    try {
    const token = loginAsBarber
      ? await loginBarber({ username: username.trim(), password })
      : await loginUser({ username: username.trim(), password });

    login(token);

    const payload = jwtDecode<DecodedToken>(token);
    const role = payload?.role;

    const route =
      role === "ADMIN" ? "/admin" :
      role === "BARBER" ? "/barber" : "/";

    navigate(route, { replace: true });
    } catch (error) {
      setErr("Login failed. Check your credentials.");
    
    }
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold">Welcome Back</h1>
              <p className="text-gray-600 mt-1">
                Sign in to book or manage your appointments.
              </p>
            </div>

            
            <div className="mb-6 flex justify-center">
              <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLoginAsBarber(false)}
                  className={`px-4 py-2 text-sm ${
                    !loginAsBarber
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setLoginAsBarber(true)}
                  className={`px-4 py-2 text-sm border-l border-gray-200 ${
                    loginAsBarber
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  Barber
                </button>
              </div>
            </div>

            {err && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                {err}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    className="w-full border rounded-lg px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute inset-y-0 right-3 my-auto text-sm text-blue-600"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
