"use client";

import ReadContract from "@/components/contract/readContract";
import InteractionButtonContract from "@/components/contract/interactionButtonContract";
import Navbar from "@/components/navbar/navbar";

function App() {
  return (
    <main>
      <Navbar />
      <ReadContract />
      <InteractionButtonContract />
    </main>
  );
}

export default App;
