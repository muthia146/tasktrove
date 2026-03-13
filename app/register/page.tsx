"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      alert("Registrasi Berhasil! Silakan Login.");
      router.push('/login');
    } else {
      alert("Registrasi Gagal, coba email lain.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans">
      <form onSubmit={handleRegister} className="p-8 border rounded-xl shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Daftar Akun</h2>
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
        <button className="w-full bg-green-600 text-white p-2 rounded font-bold">Register</button>
        <p className="text-xs text-center">Sudah punya akun? <a href="/login" className="text-blue-500">Login</a></p>
      </form>
    </div>
  );
}