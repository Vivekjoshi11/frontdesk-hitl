import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function expireOldRequests(timeoutMinutes = 2) {
  const snapshot = await getDocs(collection(db, "helpRequests"));

  const now = Timestamp.now();
  const timeoutMillis = timeoutMinutes * 60 * 1000;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const createdAt = data.createdAt?.toDate?.();
    const status = data.status;

    if (
      status === "pending" &&
      createdAt &&
      now.toMillis() - createdAt.getTime() > timeoutMillis
    ) {
      await updateDoc(doc(db, "helpRequests", docSnap.id), {
        status: "unresolved",
      });
    }
  }
}
