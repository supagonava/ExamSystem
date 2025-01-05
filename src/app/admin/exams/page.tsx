'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { mockAdminExams, mockAdminQuestions, mockQuestionTypes } from '@/data/mock';

export default function ExamsPage() {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [lessonContent, setLessonContent] = useState('');
    const [showLessonDialog, setShowLessonDialog] = useState(false);
    const [showAssignDialog, setShowAssignDialog] = useState(false);
    const [showResultsDialog, setShowResultsDialog] = useState(false);
    interface Exam {
        title: string;
        description: string;
        duration: number;
        questions: number;
        status: string;
        createdAt: string;
    }
    const [selectedExamForAction, setSelectedExamForAction] = useState<Exam | null>(null);

    const statusTemplate = (rowData: any) => {
        const severity = rowData.status === 'Active' ? 'success' : 'warning';
        return <Tag value={rowData.status} severity={severity} />;
    };

    const actionTemplate = (rowData: any) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded text severity="info"
                onClick={() => {
                    setSelectedExam(rowData);
                    setShowDialog(false);
                }}
            />
            <Button icon="pi pi-book" rounded text severity="success"
                tooltip="Assign Lesson"
                onClick={() => {
                    setSelectedExamForAction(rowData);
                    setShowLessonDialog(true);
                }}
            />
            <Button icon="pi pi-users" rounded text severity="info"
                tooltip="Assign to Users"
                onClick={() => {
                    setSelectedExamForAction(rowData);
                    setShowAssignDialog(true);
                }}
            />
            <Button icon="pi pi-chart-bar" rounded text severity="warning"
                tooltip="View Results"
                onClick={() => {
                    setSelectedExamForAction(rowData);
                    setShowResultsDialog(true);
                }}
            />
            <Button icon="pi pi-list" rounded text severity="success"
                tooltip="Edit Questions"
                onClick={() => {
                    setSelectedExam(rowData);
                    setActiveTab(2); // Switch to Questions tab
                }}
            />
            <Button icon="pi pi-trash" rounded text severity="danger"
                tooltip="Delete Exam"
            />
        </div>
    );

    const renderLessonTab = () => (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="lessonTitle">Lesson Title</label>
                <InputText id="lessonTitle" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="documentUrl">Document URL (PDF)</label>
                <InputText id="documentUrl" placeholder="https://..." />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="readingTime">Reading Time (minutes)</label>
                <InputNumber id="readingTime" min={0} />
            </div>
            <div className="flex flex-col gap-2">
                <label>Lesson Content</label>
                <InputTextarea
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    rows={12}
                    className="w-full"
                    placeholder="Enter lesson content here..."
                />
            </div>
            <Button label="Save Lesson" className="mt-4" />
        </div>
    );

    const renderQuestionsTab = () => (
        <div className="flex flex-col gap-4">
            <Button
                label="Add Question"
                icon="pi pi-plus"
                onClick={() => setSelectedQuestion(null)}
                className="w-fit"
            />

            <DataTable
                value={mockAdminQuestions}
                rowHover
                stripedRows
                showGridlines={false}
                emptyMessage="No questions added."
            >
                <Column field="text" header="Question" />
                <Column field="type" header="Type" />
                <Column field="score" header="Score" />
                <Column body={(rowData) => (
                    <div className="flex gap-2">
                        <Button icon="pi pi-pencil" rounded text severity="info"
                            onClick={() => setSelectedQuestion(rowData)}
                        />
                        <Button icon="pi pi-trash" rounded text severity="danger" />
                    </div>
                )} />
            </DataTable>

            <Dialog
                header={selectedQuestion ? 'Edit Question' : 'Add Question'}
                visible={!!selectedQuestion}
                onHide={() => setSelectedQuestion(null)}
                style={{ width: '600px' }}
            >
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="questionText">Question Text</label>
                        <InputTextarea id="questionText" rows={3} />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="questionType">Question Type</label>
                            <Dropdown
                                id="questionType"
                                options={mockQuestionTypes}
                                placeholder="Select Type"
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="score">Score</label>
                            <InputNumber id="score" min={0} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Answers</label>
                        <div className="flex flex-col gap-2">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <InputText className="flex-1" placeholder={`Answer ${index}`} />
                                    <Button
                                        icon="pi pi-check"
                                        rounded
                                        text
                                        severity="success"
                                        tooltip="Mark as correct answer"
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        rounded
                                        text
                                        severity="danger"
                                    />
                                </div>
                            ))}
                            <Button
                                label="Add Answer"
                                icon="pi pi-plus"
                                text
                                className="w-fit mt-2"
                            />
                        </div>
                    </div>

                    <Button label={selectedQuestion ? 'Update' : 'Add'} className="mt-4" />
                </div>
            </Dialog>
        </div>
    );

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Exam Management</h1>
                {!selectedExam && <Button label="Create New Exam" icon="pi pi-plus"
                    onClick={() => {
                        setSelectedExam(null);
                        setShowDialog(true);
                    }}
                />}
                {selectedExam && <Button label="Back"
                    onClick={() => setSelectedExam(null)}
                />}
            </div>

            <Card>
                {selectedExam ? (
                    <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                        <TabPanel header="Exam Details">
                            <div className="flex flex-col gap-4 p-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="title">Title</label>
                                    <InputText id="title" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="description">Description</label>
                                    <InputTextarea id="description" rows={3} />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label htmlFor="duration">Duration (minutes)</label>
                                        <InputNumber id="duration" min={0} />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label htmlFor="passingScore">Passing Score (%)</label>
                                        <InputNumber id="passingScore" min={0} max={100} />
                                    </div>
                                </div>
                                <Button label="Update" className="mt-4" />
                            </div>
                        </TabPanel>
                        <TabPanel header="Lesson Content">
                            {renderLessonTab()}
                        </TabPanel>
                        <TabPanel header="Questions">
                            {renderQuestionsTab()}
                        </TabPanel>
                    </TabView>
                ) : (
                    <DataTable
                        value={mockAdminExams}
                        paginator
                        rows={10}
                        rowHover
                        stripedRows
                        showGridlines={false}
                        emptyMessage="No exams found."
                    >
                        <Column field="title" header="Title" sortable />
                        <Column field="description" header="Description" />
                        <Column field="duration" header="Duration (min)" sortable />
                        <Column field="questions" header="Questions" sortable />
                        <Column field="status" header="Status" body={statusTemplate} sortable />
                        <Column field="createdAt" header="Created At" sortable />
                        <Column body={actionTemplate} header="Actions" style={{ width: '150px' }} />
                    </DataTable>
                )}
            </Card>

            <Dialog
                header="Create New Exam"
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                style={{ width: '500px' }}
            >
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <InputTextarea id="description" rows={3} />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="duration">Duration (minutes)</label>
                            <InputNumber id="duration" min={0} />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="passingScore">Passing Score (%)</label>
                            <InputNumber id="passingScore" min={0} max={100} />
                        </div>
                    </div>
                    <Button label="Create" className="mt-4" />
                </div>
            </Dialog>

            {/* Assign Lesson Dialog */}
            <Dialog
                header="Assign Lesson"
                visible={showLessonDialog}
                onHide={() => setShowLessonDialog(false)}
                style={{ width: '500px' }}
            >
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col gap-2">
                        <label>Selected Exam</label>
                        <InputText value={selectedExamForAction?.title} disabled />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Document URL (PDF)</label>
                        <InputText placeholder="https://..." />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                            <label>Reading Time (minutes)</label>
                            <InputNumber min={0} />
                        </div>
                    </div>
                    <Button label="Assign" className="mt-4" />
                </div>
            </Dialog>

            {/* Assign Users Dialog */}
            <Dialog
                header="Assign Users"
                visible={showAssignDialog}
                onHide={() => setShowAssignDialog(false)}
                style={{ width: '600px' }}
            >
                <div className="flex flex-col gap-4 p-4">
                    <DataTable
                        value={[
                            { id: 1, name: 'User 1', email: 'user1@example.com' },
                            { id: 2, name: 'User 2', email: 'user2@example.com' },
                        ]}
                        selectionMode="multiple"
                        selection={[]}
                        onSelectionChange={(e) => {/* Handle selection */}}
                    >
                        <Column selectionMode="multiple" style={{ width: '3rem' }} />
                        <Column field="name" header="Name" />
                        <Column field="email" header="Email" />
                    </DataTable>
                    <Button label="Assign Selected Users" className="mt-4" />
                </div>
            </Dialog>

            {/* View Results Dialog */}
            <Dialog
                header="Exam Results"
                visible={showResultsDialog}
                onHide={() => setShowResultsDialog(false)}
                style={{ width: '800px' }}
            >
                <div className="flex flex-col gap-4 p-4">
                    <DataTable
                        value={[
                            { user: 'User 1', score: 85, status: 'Passed', completedAt: '2024-01-15' },
                            { user: 'User 2', score: 65, status: 'Failed', completedAt: '2024-01-16' },
                        ]}
                    >
                        <Column field="user" header="User" />
                        <Column field="score" header="Score" />
                        <Column field="status" header="Status" body={(rowData) => (
                            <Tag
                                severity={rowData.status === 'Passed' ? 'success' : 'danger'}
                                value={rowData.status}
                            />
                        )} />
                        <Column field="completedAt" header="Completed At" />
                        <Column body={(rowData) => (
                            <Button
                                icon="pi pi-eye"
                                rounded
                                text
                                severity="info"
                                tooltip="View Details"
                            />
                        )} />
                    </DataTable>
                </div>
            </Dialog>
        </div>
    );
}
