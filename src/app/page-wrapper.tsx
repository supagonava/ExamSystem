'use client';
import { useEffect, useState } from 'react';

interface PageWrapperProps {
  id: string;
  Component: React.ComponentType<{ examId: string }>;
}

export function PageWrapper({ id, Component }: PageWrapperProps) {
  return <Component examId={id} />;
}
