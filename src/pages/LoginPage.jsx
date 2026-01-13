// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Cek login admin
    if (email.trim() === ADMIN_USERNAME && password.trim() === ADMIN_PASSWORD) {
      onLogin("admin"); // ✅ kirim string khusus "admin"
      navigate("/");
      return;
    }

    // Login user biasa (tanpa password)
    if (!password.trim()) {
      const trimmedEmail = email.trim().toLowerCase();

      if (!trimmedEmail) {
        setError("Email tidak boleh kosong");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setError("Masukkan email yang valid");
        return;
      }

      if (!trimmedEmail.endsWith("@gmail.com")) {
        setError("Hanya email @gmail.com yang diperbolehkan.");
        return;
      }

      onLogin(trimmedEmail); // ✅ kirim email sebagai string
      navigate("/");
      return;
    }

    setError("Username atau password salah!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            <Link to="/register" className="text-gray-600 hover:text-black font-medium">
              Register User
            </Link>
            <span>Login</span>
          </div>
          <CardTitle>Login</CardTitle>
          <CardDescription>Masukkan email @gmail.com atau admin credentials.</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email / Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="contoh@gmail.com atau 'admin'"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? "border-red-500" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (opsional)</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? "border-red-500" : ""}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white"
            >
              LOG IN
            </Button>
            <p className="text-xs text-center text-gray-500">
              Hanya email @gmail.com atau admin yang bisa login.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}