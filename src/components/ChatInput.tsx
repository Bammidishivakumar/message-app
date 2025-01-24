import { useState } from "react";
import { Send, Plus, Image, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileUpload = (type: 'photo' | 'video' | 'document') => {
    // Create an input element
    const input = document.createElement('input');
    input.type = 'file';
    
    // Set accepted file types based on upload type
    switch(type) {
      case 'photo':
        input.accept = 'image/*';
        break;
      case 'video':
        input.accept = 'video/*';
        break;
      case 'document':
        input.accept = '.pdf,.doc,.docx,.txt';
        break;
    }

    // Handle file selection
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log(`Selected ${type}:`, file);
        // Here you would typically handle the file upload
        // For now we'll just log it
      }
    };

    // Trigger file selection dialog
    input.click();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" type="button">
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => handleFileUpload('photo')}>
            <Image className="mr-2 h-4 w-4" />
            <span>Photo</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFileUpload('video')}>
            <Video className="mr-2 h-4 w-4" />
            <span>Video</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFileUpload('document')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Document</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
      />
      <Button type="submit">
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};