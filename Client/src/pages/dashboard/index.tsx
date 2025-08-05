'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/src/context/userContext';
import Navbar from '@/src/components/common/navbar';
import AdminDashboard from './adminDashBoard'
import UserDashboard from './userDashBoard';
import TeacherDashboard from './teacherDashBoard';

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
