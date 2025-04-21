'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/src/context/userContent';
import Navbar from '@/src/components/common/navbar';
import AdminDashboard from './adminDashboard'
import UserDashboard from './userDashboard';
import TeacherDashboard from './TeacherDashBoard';

export default function Dashboard() {
    const { user } = useUser();
    const [content, setContent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        if (!user) return;
        if (user.role === 'admin') {
            setContent(<AdminDashboard />);
        } else if (user.role === 'student'){
            setContent(<UserDashboard />);
        } else if (user.role === 'teacher') {
            setContent(<TeacherDashboard />);
        }
    }, [user]);

    return (
        <div>
            <Navbar />
            {content || <div>Loading dashboard...</div>}
        </div>
    );
}
