'use client';

import React from 'react';
import { ExamContent } from "./ExamContent"


export default function ExamPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params);
    return (
        <div className="container mx-auto p-4">
            <ExamContent examId={unwrappedParams.id} />
        </div>
    );
}
