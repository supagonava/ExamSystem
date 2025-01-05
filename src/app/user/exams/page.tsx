'use client';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { getUpcomingExams } from '@/data/mock'; // Import mock function

interface Exam {
    id: string;
    title: string;
    description?: string;
    duration: number;
    startTime: string;
    status: 'Ready' | 'Scheduled' | 'In Progress';
    documentUrl?: string;
}

export default function UserExams() {
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Replace API call with mock data
        try {
            const mockExams = getUpcomingExams();
            setExams(mockExams);
        } catch (error) {
            console.error('Failed to load exams:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const startExam = (examId: string) => {
        router.push(`/user/exams/${examId}/documents`);
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
                <Column
                    field="startTime"
                    header="Start Time"
                    body={(rowData) => new Date(rowData.startTime).toLocaleString()}
                    sortable
                />
                <Column
                    field="status"
                    header="Status"
                    sortable
                    body={(rowData) => (
                        <span className={`px-2 py-1 rounded ${
                            rowData.status === 'Ready' ? 'bg-green-100 text-green-800' :
                            rowData.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                            {rowData.status}
                        </span>
                    )}
                />
                <Column
                    body={(rowData) => (
                        <Button
                            label="Start Exam"
                            severity="success"
                            size="small"
                            disabled={rowData.status === 'In Progress'}
                            onClick={() => startExam(rowData.id)}
                        />
                    )}
                    header="Action"
                    style={{ width: '10%' }}
                />
            </DataTable>
        </div>
    );
}
