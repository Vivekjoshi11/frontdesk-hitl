// import AgentSimulator from "./components/AgentSimulator";
import CallSimulator from "./components/CallSimulator";
import SupervisorDashboard from "./components/SupervisorDashboard";
// import SupervisorPanel from "./supervisor/page";

export default function Home() {
  return (
    // <main className="p-6 text-black">
    //   {/* <AgentSimulator /> */}
    //   {/* <SupervisorPanel /> */}
    //   <SupervisorDashboard />
    // </main>
    <main className="p-6 text-black">
    <SupervisorDashboard />
    <CallSimulator />
  </main>
  );
}
