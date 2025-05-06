// // src/components/CallSimulator.tsx
// import React, { useState } from 'react';
// import { getAIResponse } from '../lib/aiAgent';
// import { createHelpRequest } from '../lib/firebaseService';

// const CallSimulator: React.FC = () => {
//   const [question, setQuestion] = useState('');
//   const [response, setResponse] = useState('');

//   const handleAsk = async () => {
//     // const { answer, needsHelp } = getAIResponse(question);
//     const { answer, needsHelp } = await getAIResponse(question);

//     setResponse(answer);
//     if (needsHelp) {
//       await createHelpRequest(question);
//     }
//   };

//   return (
//     <div>
//       <h2>Simulate Call</h2>
//       <input
//         type="text"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         placeholder="Ask a question"
//       />
//       <button onClick={handleAsk}>Ask</button>
//       <p>AI Response: {response}</p>
//     </div>
//   );
// };

// export default CallSimulator;

"use client";
import React, { useState } from 'react';
import { getAIResponse } from '../lib/aiAgent';
import { createHelpRequest } from '../lib/firebaseService';

const CallSimulator: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    console.log("clicked");
    const { answer, needsHelp } = await getAIResponse(question); // <-- await added
    setResponse(answer);
    if (needsHelp) {
      await createHelpRequest(question); // <-- now this is defined
    }
  };

  return (
    <div>
      <h2>Simulate Call</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question"
      />
      <button onClick={handleAsk} color='white'>Ask</button>
      <p>AI Response: {response}</p>
    </div>
  );
};

export default CallSimulator;
