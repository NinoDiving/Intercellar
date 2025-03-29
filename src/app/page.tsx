"use client";

import ReadContract from "@/components/contract/readContract";
import InteractionButtonContract from "@/components/contract/interactionButtonContract";
import Navbar from "@/components/navbar/navbar";
import WatchEvent from "@/components/contract/watchEvent";

function App() {
  return (
    <main>
      <Navbar />
      <ReadContract />
      <WatchEvent />
      <InteractionButtonContract />
    </main>
  );
}

export default App;
