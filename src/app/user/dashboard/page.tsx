'use client'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { useRouter } from 'next/navigation'
import { getUpcomingExams, getRecentResults } from '@/data/mock'

export default function DashboardPage() {
  const router = useRouter()
  const userId = 'user1' // This would come from auth context in real app

  const upcomingExams = getUpcomingExams(userId)
  const recentResults = getRecentResults(userId)

  const statusTemplate = (rowData: any) => {
    const severity = rowData.status === 'Ready' 
      ? 'success' 
      : rowData.status === 'Scheduled' 
        ? 'warning' 
        : 'info'
    
    return <Tag value={rowData.status} severity={severity} />
  }

  const resultStatusTemplate = (rowData: any) => {
    return <Tag 
      value={rowData.status} 
      severity={rowData.status === 'Passed' ? 'success' : 'danger'} 
    />
  }

  const scoreTemplate = (rowData: any) => {
    return `${rowData.score}%`
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Student</h1>
            <p className="text-blue-100">Here's your exam overview</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm">Next exam in</p>
              <p className="text-2xl font-bold">2 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Upcoming Exams" className="shadow-lg hover:shadow-xl transition-shadow">
          <DataTable 
            value={upcomingExams}
            rows={5}
            className="p-datatable-sm p-datatable-hoverable-rows"
            emptyMessage="No upcoming exams"
            responsiveLayout="stack"
            breakpoint="960px"
          >
            <Column field="title" header="Exam" />
            <Column field="startTime" header="Date" />
            <Column field="duration" header="Duration (min)" />
            <Column field="status" header="Status" body={statusTemplate} />
          </DataTable>
        </Card>

        <Card title="Recent Results" className="shadow-lg hover:shadow-xl transition-shadow">
          <DataTable 
            value={recentResults}
            rows={5}
            className="p-datatable-sm p-datatable-hoverable-rows"
            emptyMessage="No results yet"
            responsiveLayout="stack"
            breakpoint="960px"
          >
            <Column field="examTitle" header="Exam" />
            <Column field="completedAt" header="Date" />
            <Column field="score" header="Score" body={scoreTemplate} />
            <Column field="status" header="Status" body={resultStatusTemplate} />
          </DataTable>
        </Card>
      </div>
    </div>
  )
}
