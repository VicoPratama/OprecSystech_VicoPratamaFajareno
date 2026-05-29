import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookCopy, LogOut, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
          <span className="text-lg font-bold text-slate-900">AdminPanel</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center px-3 py-2.5 bg-indigo-50 text-indigo-600 rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <BookCopy className="w-5 h-5 mr-3" />
            Master Buku
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5 mr-3" />
            Peminjaman
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between">
          <h1 className="text-xl font-semibold text-slate-800">Dashboard Overview</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-slate-600">Halo, {user.username}</div>
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-1">Total Buku</div>
              <div className="text-3xl font-bold text-slate-900">120</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-1">Buku Dipinjam</div>
              <div className="text-3xl font-bold text-slate-900">45</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-1">Denda Aktif</div>
              <div className="text-3xl font-bold text-slate-900">12</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Aktivitas Terbaru</h2>
            <p className="text-slate-500">Belum ada aktivitas hari ini. Modul ini dapat dikembangkan lebih lanjut untuk consume endpoint peminjaman.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
