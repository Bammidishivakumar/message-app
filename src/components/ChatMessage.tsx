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
        "p-3 rounded-lg mb-2 animate-message-fade relative group",
        isPrivate ? "bg-accent/10" : "bg-secondary"
      )}>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-primary">{username}</span>
          <p className="mt-1 text-sm">{message}</p>
          <div className="flex justify-end items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">{timestamp}</span>
            <button
              onClick={handleDeleteClick}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Delete message"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        </div>
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