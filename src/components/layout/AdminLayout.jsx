import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Building2,
    LogOut,
    ShieldCheck,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLayout({ children }) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/hospitals', label: 'Hospitals', icon: Building2 },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen bg-page text-page flex flex-col md:flex-row">

            {/* Mobile Header */}
            <div className="md:hidden bg-card border-b border-page-border p-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                        <ShieldCheck className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">Admin Panel</span>
                </div>
                <button onClick={toggleSidebar} className="p-2 hover:bg-page-border/50 rounded-lg">
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[rgb(14,14,14)] border-r border-page-border flex flex-col transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:h-screen md:sticky md:top-0
            `}>
                <div className="p-6 border-b border-page-border flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <ShieldCheck className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Admin<br /><span className="text-accent">Panel</span></h1>
                    </div>
                    {/* Close button for mobile within sidebar (optional, X in header usually enough but good for UX) */}
                    <button onClick={closeSidebar} className="md:hidden ml-auto p-2 hover:bg-page-border/50 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar} // Close on nav click (mobile)
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${location.pathname === item.path
                                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                : 'text-page-subtle hover:bg-page-border/50 hover:text-page'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-page-border mt-auto">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-page-border flex items-center justify-center">
                            <span className="font-bold text-xs uppercase">{user?.name?.charAt(0) || 'A'}</span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-page-subtle truncate">Super Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
