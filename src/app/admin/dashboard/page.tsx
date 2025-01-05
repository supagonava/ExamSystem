'use client';

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { FaBookOpen, FaUsers, FaClipboardCheck } from 'react-icons/fa';
import LogoutButton from '@/components/LogoutButton';

export default function AdminDashboard() {
  const sampleData = [
    { id: 1, title: 'JavaScript Fundamentals', candidates: 45, avgScore: 78, status: 'Active' },
    { id: 2, title: 'React Basics', candidates: 32, avgScore: 82, status: 'Completed' },
    { id: 3, title: 'TypeScript Advanced', candidates: 28, avgScore: 75, status: 'Draft' },
    { id: 4, title: 'Node.js Essentials', candidates: 50, avgScore: 88, status: 'Active' },
  ];

  const statusTemplate = (rowData: { status: 'Active' | 'Completed' | 'Draft' }) => {
    const statusMap: Record<'Active' | 'Completed' | 'Draft', "success" | "info" | "warning" | "danger" | "secondary" | "contrast"> = {
      'Active': 'success',
      'Completed': 'info',
      'Draft': 'warning'
    };
    return <Tag value={rowData.status} severity={statusMap[rowData.status]} />;
  };

  const titleTemplate = (rowData: any) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">{rowData.title}</span>
        <span className="text-sm text-gray-500">ID: {rowData.id}</span>
      </div>
    );
  };

  const candidatesTemplate = (rowData: any) => {
    return (
      <div className="text-center">
        <span className="font-medium text-blue-600">{rowData.candidates}</span>
        <span className="text-sm text-gray-500 block">Participants</span>
      </div>
    );
  };

  const scoreTemplate = (rowData: any) => {
    const scoreColor = rowData.avgScore >= 80 ? 'text-green-600' : 
                      rowData.avgScore >= 70 ? 'text-blue-600' : 'text-orange-600';
    return (
      <div className="text-center">
        <span className={`text-lg font-semibold ${scoreColor}`}>
          {rowData.avgScore}%
        </span>
      </div>
    );
  };

  const statsCards = [
    { title: 'Total Exams', value: '25', icon: <FaBookOpen size={24} className="text-blue-500" /> },
    { title: 'Active Users', value: '150', icon: <FaUsers size={24} className="text-green-500" /> },
    { title: 'Completed Exams', value: '1,234', icon: <FaClipboardCheck size={24} className="text-purple-500" /> }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-lg font-semibold text-gray-600 mb-2">{card.title}</h5>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">{card.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card title="Recent Exams" className="shadow-lg">
          <DataTable
            value={sampleData}
            paginator
            rows={5}
            rowHover
            stripedRows
            showGridlines={false}
            className="p-datatable-custom"
            emptyMessage="No exams found."
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} exams"
            paginatorClassName="bg-gray-50 border-t border-gray-200 p-4"
            rowClassName={() => "hover:bg-gray-50 transition-colors duration-200"}
          >
            <Column 
              field="title" 
              header="Exam Details" 
              sortable 
              body={titleTemplate}
              headerClassName="bg-gray-100 text-gray-700 font-semibold"
              className="p-4"
            />
            <Column 
              field="candidates" 
              header="Candidates" 
              sortable 
              body={candidatesTemplate}
              headerClassName="bg-gray-100 text-gray-700 font-semibold"
              className="p-4"
            />
            <Column
              field="avgScore"
              header="Average Score"
              sortable
              body={scoreTemplate}
              headerClassName="bg-gray-100 text-gray-700 font-semibold"
              className="p-4"
            />
            <Column
              field="status"
              header="Status"
              sortable
              body={statusTemplate}
              headerClassName="bg-gray-100 text-gray-700 font-semibold"
              className="p-4"
            />
          </DataTable>
        </Card>
      </div>
    </div>
  );
}

