import ExamContent from './ExamContent';

export default function ExamPage({ params }: { params: { id: string } }) {
    return <ExamContent examId={params.id} />;
}