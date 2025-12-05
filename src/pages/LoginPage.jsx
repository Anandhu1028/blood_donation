import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Phone, ArrowRight, Lock } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useDonor } from '../contexts/DonorContext';
import { toast } from 'sonner';

export function LoginPage() {
    const navigate = useNavigate();
    const { loginDonor } = useDonor();
    const [phone, setPhone] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!phone.trim()) {
            toast.error('Please enter your phone number');
            return;
        }

        const donor = loginDonor(phone);
        if (donor) {
            toast.success(`Welcome back, ${donor.name}!`);
            navigate('/dashboard');
        } else {
            toast.error('User not found. Please register first.');
        }
    };

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
                    <p className="text-page-subtle">Enter your credentials to access your account</p>
                </div>

                <Card className="card-premium">
                    <CardBody className="p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <Input
                                label="Phone Number"
                                icon={Phone}
                                type="tel"
                                placeholder="Enter your registered phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

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
                                Login
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
