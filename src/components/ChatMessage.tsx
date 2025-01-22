import { cn } from "@/lib/utils";

interface ChatMessageProps {
  username: string;
  message: string;
  timestamp: string;
  isPrivate?: boolean;
}

export const ChatMessage = ({ username, message, timestamp, isPrivate }: ChatMessageProps) => {
  return (
    <div className={cn(
      "p-3 rounded-lg mb-2 animate-message-fade",
      isPrivate ? "bg-accent/10" : "bg-secondary"
    )}>
      <div className="flex justify-between items-start">
        <span className="font-semibold text-sm text-primary">{username}</span>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
};