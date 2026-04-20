import A4Template from "@/components/A4Template";
import { MobileWarning } from "@/components/MobileWarning";

function App() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <MobileWarning />
     	<A4Template />
    </main>
  );
}

export default App;
