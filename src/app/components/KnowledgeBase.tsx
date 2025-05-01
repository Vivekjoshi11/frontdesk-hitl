"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

type KBEntry = {
  question: string;
  answer: string;
};

export default function KnowledgeBase() {
  const [entries, setEntries] = useState<KBEntry[]>([]);

  useEffect(() => {
    const fetchKB = async () => {
      const snapshot = await getDocs(collection(db, "knowledgeBase"));
      const data = snapshot.docs.map((doc) => doc.data() as KBEntry);
      setEntries(data);
    };

    fetchKB();
  }, []);

  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div key={i} className="border p-4 rounded bg-white shadow-sm">
          <p>
            <strong>Q:</strong> {entry.question}
          </p>
          <p>
            <strong>A:</strong> {entry.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
