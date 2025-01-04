import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Exams" className="shadow-lg">
          <p className="text-3xl font-bold">25</p>
        </Card>
        <Card title="Active Users" className="shadow-lg">
          <p className="text-3xl font-bold">150</p>
        </Card>
        <Card title="Completed Exams" className="shadow-lg">
          <p className="text-3xl font-bold">1,234</p>
        </Card>
      </div>

      <div className="mt-8">
        <Card title="Recent Exams" className="shadow-lg">
          <DataTable value={[]} paginator rows={10}>
            <Column field="title" header="Title" />
            <Column field="candidates" header="Candidates" />
            <Column field="avgScore" header="Average Score" />
            <Column field="status" header="Status" />
          </DataTable>
        </Card>
      </div>
    </div>
  );
}

