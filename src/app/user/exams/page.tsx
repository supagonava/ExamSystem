'use client';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { getUpcomingExams } from '@/data/mock';

interface Exam {
    id: string;
    title: string;
    description?: string;
    duration: number;
    startTime: string;
    status: 'Ready' | 'Scheduled' | 'In Progress';
}

export default function UserExams() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchExams = () => {
            const mockExams = getUpcomingExams();
            setExams(mockExams);
            setLoading(false);
        };

        fetchExams();
    }, []);

    const startExam = (examId: string) => {
        router.push(`/user/exams/${examId}`);
    };

    const actionTemplate = (rowData: Exam) => {
        return (
            <Button
                label="Start Exam"
                severity="success"
                size="small"
                disabled={rowData.status !== 'Ready'}
                onClick={() => startExam(rowData.id)}
            />
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Available Exams</h1>
            <DataTable
                value={exams}
                loading={loading}
                paginator
                rows={10}
                className="p-datatable-sm"
            >
                <Column field="title" header="Title" sortable />
                <Column field="description" header="Description" />
                <Column
                    field="duration"
                    header="Duration"
                    body={(rowData) => `${rowData.duration} minutes`}
                    sortable
                />
                <Column field="startTime" header="Start Time" sortable />
                <Column field="status" header="Status" sortable />
                <Column body={actionTemplate} header="Action" style={{ width: '10%' }} />
            </DataTable>
        </div>
    );
}
