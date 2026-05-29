import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { BookOpen } from 'lucide-react';

export default function Home() {
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuku = async () => {
      try {
        const response = await axiosClient.get('/api/v1/buku');
        setBuku(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data buku", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuku();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-600">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Perpustakaan</h1>
          </div>
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
            Admin Login
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Katalog Buku</h2>
          <p className="mt-2 text-slate-600">Temukan buku-buku terbaik di perpustakaan kami.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {buku.map((item) => (
              <div key={item.id_buku} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-slate-200 flex items-center justify-center overflow-hidden">
                  {item.gambar_buku ? (
                    <img src={item.gambar_buku} alt={item.judul_buku} className="w-full h-full object-cover" />
                  ) : (
                    <BookOpen className="w-16 h-16 text-slate-400" />
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{item.rak_buku}</span>
                  <h3 className="mt-2 text-lg font-bold text-slate-900 truncate">{item.judul_buku}</h3>
                  <p className="mt-1 text-sm text-slate-500">Tahun: {item.tahun_terbit}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Stok: {item.stok_buku}</span>
                    <button className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-md hover:bg-indigo-100 transition-colors">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
