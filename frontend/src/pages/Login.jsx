import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Lock } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axiosClient.post('/api/v1/login', { username, password });
      if (!response.data.error) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        navigate('/admin/dashboard');
      } else {
        setError(response.data.msg || 'Login gagal');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Admin Login</h2>
          <p className="text-center text-slate-500 mb-8">Masuk ke sistem perpustakaan</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-indigo-600 hover:underline">Kembali ke Beranda</a>
          </div>
        </div>
      </div>
    </div>
  );
}
