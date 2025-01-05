'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { mockAdminUsers } from '@/data/mock';

export default function UsersPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data - replace with actual API call
  const users = [
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'USER', status: 'Active', lastLogin: '2024-01-20' },
    { id: 2, username: 'admin1', email: 'admin1@example.com', role: 'ADMIN', status: 'Active', lastLogin: '2024-01-21' },
    { id: 3, username: 'user2', email: 'user2@example.com', role: 'USER', status: 'Inactive', lastLogin: '2024-01-15' },
  ];

  const statusTemplate = (rowData: any) => {
    const severity = rowData.status === 'Active' ? 'success' : 'danger';
    return <Tag value={rowData.status} severity={severity} />;
  };

  const roleTemplate = (rowData: any) => {
    const severity = rowData.role === 'ADMIN' ? 'warning' : 'info';
    return <Tag value={rowData.role} severity={severity} />;
  };

  const actionTemplate = (rowData: any) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded text severity="info" 
        onClick={() => {
          setSelectedUser(rowData);
          setShowDialog(true);
        }}
      />
      <Button icon="pi pi-trash" rounded text severity="danger" 
        onClick={() => {
          // Implement delete functionality
        }}
      />
    </div>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button label="Add New User" icon="pi pi-plus" 
          onClick={() => {
            setSelectedUser(null);
            setShowDialog(true);
          }}
        />
      </div>

      <Card>
        <DataTable
          value={mockAdminUsers}
          paginator
          rows={10}
          rowHover
          stripedRows
          showGridlines={false}
          emptyMessage="No users found."
        >
          <Column field="username" header="Username" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="role" header="Role" body={roleTemplate} sortable />
          <Column field="status" header="Status" body={statusTemplate} sortable />
          <Column field="lastLogin" header="Last Login" sortable />
          <Column body={actionTemplate} header="Actions" style={{ width: '120px' }} />
        </DataTable>
      </Card>

      <Dialog
        header={selectedUser ? 'Edit User' : 'Add New User'}
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ width: '450px' }}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <InputText id="username" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <InputText id="email" type="email" />
          </div>
          {!selectedUser && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <InputText id="password" type="password" />
            </div>
          )}
          <Button label={selectedUser ? 'Update' : 'Create'} className="mt-4" />
        </div>
      </Dialog>
    </div>
  );
}
