// src/types.ts
export interface HelpRequest {
    id: string;
    question: string;
    status: 'pending' | 'resolved' | 'unresolved';
    createdAt: Date;
    response?: string;
  }
  