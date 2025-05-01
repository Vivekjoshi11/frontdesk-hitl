/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { setDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

type Request = {
  id: string;
  question: string;
  status: "pending" | "resolved" | "unresolved";
  timestamp: Timestamp;
  answer?: string;
};

export default function SupervisorPanel() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});

  const fetchRequests = async () => {
    const q = query(collection(db, "helpRequests"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Request, "id">),
    }));
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // const handleSubmit = async (id: string) => {


  //   const answer = answers[id];
  //   if (!answer) return;

  //   const ref = doc(db, "helpRequests", id);
  //   await updateDoc(ref, {
  //     answer,
  //     status: "resolved",
  //   });

  //   // Simulate texting back the user
  //   console.log(`Text to caller: ${answer}`);

  //   // Also update the "knowledge base"
  //   await updateDoc(ref, {
  //     learned: true,
  //   });

  //   fetchRequests();
  // };

  const handleSubmit = async (id: string) => {
    const answer = answers[id];
    if (!answer) return;
  
    const ref = doc(db, "helpRequests", id);
    const req = requests.find((r) => r.id === id);
    if (!req) return;
  
    await updateDoc(ref, {
      answer,
      status: "resolved",
    });
  
    // Simulate texting the user back
    console.log(`Text to caller: ${answer}`);
  
    // Add to knowledge base
    await setDoc(doc(db, "knowledgeBase", id), {
      question: req.question,
      answer: answer,
      createdAt: Timestamp.now(),
    });
  
    fetchRequests();
  };
  
  return (
    <div className="space-y-6">
      {requests.map((req) => (
        <div
          key={req.id}
          className="border p-4 rounded shadow-sm bg-white space-y-2"
        >
          <p>
            <strong>Question:</strong> {req.question}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                req.status === "pending" ? "text-yellow-500" : "text-green-600"
              }
            >
              {req.status}
            </span>
          </p>

          {req.status === "pending" && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Type answer..."
                className="border p-2 w-full rounded"
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [req.id]: e.target.value }))
                }
              />
              <button
                onClick={() => handleSubmit(req.id)}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Submit Answer
              </button>
            </div>
          )}

          {req.status !== "pending" && req.answer && (
            <p>
              <strong>Answer:</strong> {req.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
