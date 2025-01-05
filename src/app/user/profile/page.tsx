'use client'
import { useState } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <div className="flex items-center gap-4">
          <Avatar size="xlarge" shape="circle" />
          <div>
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="text-gray-600">username@email.com</p>
          </div>
        </div>
      </Card>

      <Card title="Personal Information">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label>First Name</label>
              <InputText disabled={!editMode} />
            </div>
            <div className="flex flex-col gap-2">
              <label>Last Name</label>
              <InputText disabled={!editMode} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {editMode ? (
              <>
                <Button label="Cancel" severity="secondary" onClick={() => setEditMode(false)} />
                <Button label="Save" type="submit" />
              </>
            ) : (
              <Button label="Edit Profile" onClick={() => setEditMode(true)} />
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
