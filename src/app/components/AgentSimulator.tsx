 "use client";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const FAKE_KNOWLEDGE: Record<string, string> = {
    "What are your hours?": "We are open from 9am to 7pm every day.",
  };
  

export default function AgentSimulator() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (FAKE_KNOWLEDGE[question]) {
      setResponse(FAKE_KNOWLEDGE[question]);
    } else {
      setResponse("Let me check with my supervisor and get back to you.");

      await addDoc(collection(db, "helpRequests"), {
        question,
        status: "pending",
        timestamp: new Date(),
      });

      console.log(`Text to supervisor: "Hey, I need help answering: ${question}"`);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Call Simulation</h2>
      <input
        className="border w-full p-2 rounded"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk} className="bg-blue-600 text-white px-4 py-2 rounded">
        Ask
      </button>
      {response && <p className="mt-2 font-medium">{response}</p>}
    </div>
  );
}
