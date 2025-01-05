import ExamContent from './ExamContent';

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <ExamContent examId={id} />;
}