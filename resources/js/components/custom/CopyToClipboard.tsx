import { useState } from 'react';
import { Copy, Check, CopyCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CopyToClipboardProps = {
  text: string;
  className?: string;
};

export const CopyToClipboard = ({ text, className = '' }: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button onClick={handleCopy} className={cn("p-1 rounded text-primary cursor-pointer", className)} title="Copy">
      {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
    </button>
  );
};
