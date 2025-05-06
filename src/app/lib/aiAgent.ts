// // src/lib/aiAgent.ts
// import { knowledgeBase } from './knowledgeBase';

// export function getAIResponse(question: string): { answer: string; needsHelp: boolean } {
//   const answer = knowledgeBase[question];
//   if (answer) {
//     return { answer, needsHelp: false };
//   } else {
//     return { answer: "Let me check with my supervisor and get back to you.", needsHelp: true };
//   }
// }


// src/lib/aiAgent.ts
import { knowledgeBase } from './knowledgeBase';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function getAIResponse(question: string): Promise<{ answer: string; needsHelp: boolean }> {
  // Check static knowledge base
  if (knowledgeBase[question]) {
    return { answer: knowledgeBase[question], needsHelp: false };
  }

  // Check dynamic knowledge base from Firestore
  const querySnapshot = await getDocs(collection(db, 'helpRequests'));
  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data();
    if (data.question === question && data.status === 'resolved') {
      return { answer: data.response, needsHelp: false };
    }
  }

  return { answer: "Let me check with my supervisor and get back to you.", needsHelp: true };
}
