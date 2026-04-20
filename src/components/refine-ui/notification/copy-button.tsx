import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  text: string;
  className?: string;
};

export function NotificationCopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleCopy}
      className={cn("shrink-0", className)}
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}
