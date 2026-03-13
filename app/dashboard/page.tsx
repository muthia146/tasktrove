"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [assignments, setAssignments] = useState([]);
  const [course, setCourse] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState(''); 
  const router = useRouter();

  const loadData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const res = await fetch('/api/tasks', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.ok) {
      const data = await res.json();
      setAssignments(data);
    } else {
      router.push('/login');
    }
  };

  useEffect(() => { loadData(); }, []);

  // 1. FUNGSI TAMBAH (PASTIKAN LINK MASUK KE DATABASE)
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        course_name: course, 
        task_desc: desc,
        link: link // PASTIKAN BARIS INI ADA
      })
    });
  
    if (res.ok) {
      setCourse(''); 
      setDesc(''); 
      setLink(''); // Reset form link setelah berhasil
      loadData();
    }
  };

  // 2. FUNGSI UPDATE STATUS (BERSIH TANPA PROMPT)
  const handleUpdateStatus = async (id: number, newStatus: string, currentLink: string) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        status: newStatus, 
        link: currentLink || '' // Gunakan link yang sudah ada dari awal
      })
    });

    if (res.ok) loadData(); 
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus tugas ini?")) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) loadData(); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="p-10 max-w-3xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-700">TaskTrove Assignments</h1>
        <button onClick={handleLogout} className="text-red-500 text-sm font-semibold">Logout</button>
      </div>
      
      {/* FORM INPUT AWAL (Link sudah ada di sini) */}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl mb-8 border shadow-sm space-y-4">
        <input 
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Mata Kuliah" 
          value={course} onChange={(e)=>setCourse(e.target.value)} required 
        />
        <input 
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Deskripsi Tugas" 
          value={desc} onChange={(e)=>setDesc(e.target.value)} required 
        />
        <input 
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Link Pengumpulan (Wajib isi agar muncul)" 
          value={link} onChange={(e)=>setLink(e.target.value)} 
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-all">
          Tambah Tugas
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="font-semibold text-gray-500 mb-2 uppercase text-xs tracking-widest">Daftar Assignment</h2>
        {assignments.length > 0 ? assignments.map((item: any) => (
          <div key={item.id} className="p-5 border rounded-xl shadow-sm bg-white flex justify-between items-center hover:border-blue-300 transition-all">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">{item.course_name}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.task_desc}</p>
              
              {/* TAMPILAN LINK (Sudah diperbaiki agar muncul jika link ada) */}
              {item.link && (
                <a 
                  href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs font-bold underline block mb-3 hover:text-blue-800"
                >
                  🔗 Klik Link Pengumpulan
                </a>
              )}

              <div className="flex gap-3 items-center mt-2">
                <select 
                  value={item.status}
                  onChange={(e) => handleUpdateStatus(item.id, e.target.value, item.link)}
                  className={`text-[10px] px-2 py-1 rounded font-bold uppercase border-none cursor-pointer outline-none ${
                    item.status === 'Done' ? 'bg-green-100 text-green-700' : 
                    item.status === 'Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded font-bold uppercase hover:bg-red-100"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-400 py-10 italic">Belum ada tugas.</p>
        )}
      </div>
    </div>
  );
}