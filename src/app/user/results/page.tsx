'use client'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ResultsPage() {
    const router = useRouter()
    // Mock results data
    const [results] = useState([
        {
            id: 1,
            examTitle: 'Mathematics Final',
            completedAt: '2024-01-15',
            score: '85/100',
            status: 'Passed'
        },
        {
            id: 2,
            examTitle: 'Physics Midterm',
            completedAt: '2024-01-10',
            score: '72/100',
            status: 'Passed'
        },
        {
            id: 3,
            examTitle: 'Chemistry Quiz',
            completedAt: '2024-01-05',
            score: '45/100',
            status: 'Failed'
        },
        {
            id: 4,
            examTitle: 'Biology Test',
            completedAt: '2024-01-01',
            score: '90/100',
            status: 'Passed'
        }
    ])

    const actionTemplate = (rowData: any) => {
        return (
            <Button
                label="View Details"
                link
                onClick={() => router.push(`/results/${rowData.id}`)}
            />
        )
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Exam Results</h1>

            <DataTable value={results}>
                <Column field="examTitle" header="Exam" sortable />
                <Column field="completedAt" header="Date" sortable />
                <Column field="score" header="Score" sortable />
                <Column field="status" header="Status" sortable />
                <Column body={actionTemplate} header="Actions" />
            </DataTable>
        </div>
    )
}