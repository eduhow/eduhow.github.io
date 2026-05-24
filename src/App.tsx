import { useState, useEffect } from "react";
import A4Template from "@/components/A4Template";
import { MobileWarning } from "@/components/MobileWarning";
import { FeedbackButton } from "@/components/FeedbackButton";

function App() {
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setPreviewMode(!!document.querySelector(".preview-mode"));
    });
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col" >
      <MobileWarning />
      <A4Template />
      {!previewMode && <FeedbackButton />}
    </main>
  );
}

export default App;