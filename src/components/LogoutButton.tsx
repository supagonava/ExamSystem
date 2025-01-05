'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
