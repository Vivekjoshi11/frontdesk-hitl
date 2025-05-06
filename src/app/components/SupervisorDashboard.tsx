// // src/components/SupervisorDashboard.tsx
// "use client";
// import React, { useEffect, useState } from 'react';
// import { db } from '../lib/firebase';
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
// import { HelpRequest } from '../types';

// const SupervisorDashboard: React.FC = () => {
//   const [requests, setRequests] = useState<HelpRequest[]>([]);
//   const [responseMap, setResponseMap] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const fetchRequests = async () => {
//       const querySnapshot = await getDocs(collection(db, 'helpRequests'));
//       const fetchedRequests: HelpRequest[] = [];
//       querySnapshot.forEach((docSnap) => {
//         const data = docSnap.data() as Omit<HelpRequest, 'id'>;
//         fetchedRequests.push({ id: docSnap.id, ...data });
//       });
//       setRequests(fetchedRequests);
//     };

//     fetchRequests();
//   }, []);

//   const handleResponseChange = (id: string, value: string) => {
//     setResponseMap((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (id: string) => {
//     const response = responseMap[id];
//     if (response) {
//       const requestRef = doc(db, 'helpRequests', id);
//       await updateDoc(requestRef, {
//         response,
//         status: 'resolved',
//       });
//       // Optionally, update local state or refetch requests
//     }
//   };

//   return (
//     <div>
//       <h2>Supervisor Dashboard</h2>
//       {requests
//         .filter((req) => req.status === 'pending')
//         .map((req) => (
//           <div key={req.id}>
//             <p>Question: {req.question}</p>
//             <input
//               type="text"
//               value={responseMap[req.id] || ''}
//               onChange={(e) => handleResponseChange(req.id, e.target.value)}
//               placeholder="Your response"
//             />
//             <button onClick={() => handleSubmit(req.id)}>Submit</button>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default SupervisorDashboard;



// components/SupervisorDashboard.tsx
"use client";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const LOCAL_STORAGE_KEY = "supervisor_messages";

const SupervisorDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Supervisor",
      text: input,
      timestamp: new Date().toLocaleString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Supervisor Dashboard (LocalStorage)</h2>

      <div className="border h-64 overflow-y-auto p-4 mb-4 bg-gray-100 rounded">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong>{msg.sender}</strong>: {msg.text}
            <div className="text-sm text-gray-500">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message"
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
