import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Phone, ArrowRight, Lock, Building2, ShieldCheck, User } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [role, setRole] = useState('donor'); // 'donor', 'hospital', 'admin'

    // Form States
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!identifier.trim()) {
            toast.error('Please enter your credentials');
            return;
        }

        const result = login(role, identifier, password);

        if (result.success) {
            toast.success(`Welcome back, ${result.user.name || 'User'}!`);

            // Redirect based on role
            if (role === 'admin') navigate('/admin');
            else if (role === 'hospital') navigate('/hospital-dashboard');
            else navigate('/dashboard');
        } else {
            toast.error(result.message);
        }
    };

    const roles = [
        { id: 'donor', label: 'Donor', icon: User },
        { id: 'hospital', label: 'Hospital', icon: Building2 },
        { id: 'admin', label: 'Admin', icon: ShieldCheck }
    ];

    return (
        <div className="min-h-screen bg-page text-page flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-display font-black mb-2 gradient-text">Welcome Back</h1>
                    <p className="text-page-subtle">Select your role to login</p>
                </div>

                <Card className="card-premium">
                    <CardBody className="p-8">
                        {/* Role Tabs */}
                        <div className="flex bg-page-border/50 p-1 rounded-xl mb-8">
                            {roles.map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => {
                                        setRole(r.id);
                                        setIdentifier('');
                                        setPassword('');
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${role === r.id
                                            ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                            : 'text-page-subtle hover:text-page hover:bg-white/5'
                                        }`}
                                >
                                    <r.icon className="w-4 h-4" />
                                    {r.label}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {role === 'donor' && (
                                <Input
                                    label="Phone Number"
                                    icon={Phone}
                                    type="tel"
                                    placeholder="Registered phone number"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            )}

                            {role === 'hospital' && (
                                <>
                                    <Input
                                        label="Email or Phone"
                                        icon={Building2}
                                        type="text"
                                        placeholder="Hospital email or phone"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                    <Input
                                        label="Password"
                                        icon={Lock}
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </>
                            )}

                            {role === 'admin' && (
                                <>
                                    <Input
                                        label="Username"
                                        icon={User}
                                        type="text"
                                        placeholder="Admin username"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                    <Input
                                        label="Password"
                                        icon={Lock}
                                        type="password"
                                        placeholder="Admin password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </>
                            )}

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer text-page-subtle hover:text-page transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="rounded border-page-border bg-white/5 text-accent focus:ring-accent"
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="text-accent hover:text-accent-bright transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            <Button type="submit" className="w-full group">
                                <LogIn className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Login as {roles.find(r => r.id === role)?.label}
                                <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Button>

                            <div className="text-center text-sm text-page-subtle mt-6">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-accent font-semibold hover:underline">
                                    Register now
                                </Link>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
}
