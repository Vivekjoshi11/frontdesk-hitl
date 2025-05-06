/* eslint-disable @typescript-eslint/no-unused-vars */
// src/lib/firebaseService.ts
// import { db } from './firebase';
// import { collection, addDoc, Timestamp } from 'firebase/firestore';
// import { HelpRequest } from '../types'; 

// export const createHelpRequest = async (question: string) => {
//   const helpRequest: Omit<HelpRequest, 'id'> = {
//     question,
//     status: 'pending',
//     createdAt: new Date(),
//   };
//   await addDoc(collection(db, 'helpRequests'), helpRequest);
// };


// // src/lib/firebaseService.ts
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
// import { db } from './firebase';

// export const markUnresolvedRequests = async () => {
//   const querySnapshot = await getDocs(collection(db, 'helpRequests'));
//   const now = new Date();

//   querySnapshot.forEach(async (docSnap) => {
//     const data = docSnap.data();
//     if (data.status === 'pending') {
//       const createdAt = data.createdAt.toDate();
//       const elapsed = now.getTime() - createdAt.getTime();
//       const timeout = 5 * 60 * 1000; // 5 minutes

//       if (elapsed > timeout) {
//         const requestRef = doc(db, 'helpRequests', docSnap.id);
//         await updateDoc(requestRef, { status: 'unresolved' });
//       }
//     }
//   });
// };


// src/lib/firebaseService.ts
import { collection,addDoc, getDocs, doc as firestoreDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const markUnresolvedRequests = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'helpRequests'));
    const now = new Date();
    const timeout = 5 * 60 * 1000; // 5 minutes

    querySnapshot.forEach(async (docSnap) => {
      const data = docSnap.data();

      if (data.status === 'pending') {
        const createdAt = data.createdAt?.toDate?.();
        if (!createdAt) return;

        const elapsed = now.getTime() - createdAt.getTime();
        if (elapsed > timeout) {
          const requestRef = firestoreDoc(db, 'helpRequests', docSnap.id);
          await updateDoc(requestRef, { status: 'unresolved' });
        }
      }
    });
  } catch (error) {
    console.error('Error marking unresolved requests:', error);
  }
};
export const createHelpRequest = async (question: string) => {
  try {
    await addDoc(collection(db, 'helpRequests'), {
      question,
      status: 'pending',
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error creating help request:', error);
  }
};
