
import DocumentContent from './DocumentContent';

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const id = params.id;
  return <DocumentContent examId={id} />;
}