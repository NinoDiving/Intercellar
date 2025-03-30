"use client";

import ReadContract from "@/components/contract/readContract";
import InteractionButtonContract from "@/components/contract/interactionContract/interactionButtonContract";
import Navbar from "@/components/navbar/navbar";
import WatchEvent from "@/components/contract/watchEventContract/watchEvent";
import Footer from "@/components/footer/footer";
function App() {
  return (
    <main>
      <Navbar />
      <ReadContract />
      <InteractionButtonContract />
      <WatchEvent />
      <Footer />
    </main>
  );
}

export default App;
