import AgentSimulator from "./components/AgentSimulator";
import SupervisorPanel from "./supervisor/page";

export default function Home() {
  return (
    <main className="p-6 text-black">
      <AgentSimulator />
      <SupervisorPanel />
    </main>
  );
}
