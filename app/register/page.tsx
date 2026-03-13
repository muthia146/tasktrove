'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Registrasi berhasil! Silakan login.')
      router.push('/login')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">Buat Akun TaskTrove</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-black">Email Baru</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black outline-indigo-600" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-black">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black outline-indigo-600" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </button>
        </form>
      </div>
    </div>
  )
}