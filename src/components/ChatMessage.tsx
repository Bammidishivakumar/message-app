import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface ChatMessageProps {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  isPrivate?: boolean;
  onDelete: (id: number) => void;
}

export const ChatMessage = ({ 
  id,
  username, 
  message, 
  timestamp, 
  isPrivate,
  onDelete 
}: ChatMessageProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);

  const handleDelete = () => {
    if (dontAskAgain) {
      localStorage.setItem('dontAskDeleteConfirmation', 'true');
    }
    onDelete(id);
    setShowDeleteDialog(false);
  };

  const handleDeleteClick = () => {
    const dontAsk = localStorage.getItem('dontAskDeleteConfirmation') === 'true';
    if (dontAsk) {
      handleDelete();
    } else {
      setShowDeleteDialog(true);
    }
  };

  return (
    <>
      <div className={cn(
        "p-2 rounded-lg mb-1 animate-message-fade relative group", // Reduced padding and margin-bottom
        isPrivate ? "bg-accent/10" : "bg-secondary"
      )}>
        <button
          onClick={handleDeleteClick}
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete message"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </button>
        <div className="flex justify-between items-start">
          <span className="font-semibold text-sm text-primary">{username}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="mt-0.5 text-sm">{message}</p>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-2 py-4">
            <Checkbox
              id="dontAskAgain"
              checked={dontAskAgain}
              onCheckedChange={(checked) => setDontAskAgain(checked as boolean)}
            />
            <label
              htmlFor="dontAskAgain"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don't ask again
            </label>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};