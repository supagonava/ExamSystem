
import DocumentContent from './DocumentContent';

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DocumentContent examId={id} />;
}