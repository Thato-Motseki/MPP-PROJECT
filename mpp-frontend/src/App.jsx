import { useState } from "react";
import { MainDashboard } from "./components/MainDashboard";
import { PredictionsView } from "./components/PredictionsView";
import { MarketView } from "./components/MarketView";
import { Sidebar } from "./components/Sidebar";
import { TopNavigation } from "./components/TopNavigation";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <MainDashboard />;
      case "predictions":
        return <PredictionsView />;
      case "market":
        return <MarketView />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}