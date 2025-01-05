'use client'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Card } from 'primereact/card'
import { getUserResults } from '@/data/mock'

export default function ResultsPage() {
    const router = useRouter();
    const [results] = useState(getUserResults("user1"));

    const actionTemplate = (rowData: any) => {
        return (
            <Button
                label="View Details"
                link
                onClick={() => router.push(`/user/results/${rowData.id}`)}
            />
        )
    }

    const statusBodyTemplate = (rowData: any) => {
        const className = rowData.status === 'Passed'
            ? 'text-green-600'
            : 'text-red-600';
        return <span className={className}>{rowData.status}</span>;
    };

    const scoreBodyTemplate = (rowData: any) => {
        return `${rowData.correctAnswers}/${rowData.totalQuestions} (${rowData.score}%)`;
    };

    return (
        <div className="max-w-4xl mx-auto p-4">


            <Card>
                <h2 className="text-xl font-bold mb-4">Exam History</h2>
                <DataTable value={results} paginator rows={5}
                    className="p-datatable-sm">
                    <Column field="examTitle" header="Exam Title" sortable />
                    <Column field="completedAt" header="Completed At" sortable />
                    <Column body={scoreBodyTemplate} header="Score" sortable
                        field="score" />
                    <Column body={statusBodyTemplate} header="Status" sortable
                        field="status" />
                    <Column body={actionTemplate} header="Actions" />
                </DataTable>
            </Card>
        </div>
    )
}