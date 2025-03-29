import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CopyButtonProps {
  value: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy translation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;