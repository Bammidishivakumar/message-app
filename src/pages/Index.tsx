import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { UsersList } from "@/components/UsersList";
import { MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";

interface Message {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  isPrivate?: boolean;
}

interface PrivateChat {
  userId: string;
  messages: Message[];
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username] = useState("Guest" + Math.floor(Math.random() * 1000));
  const [privateChats, setPrivateChats] = useState<PrivateChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  
  const onlineUsers = ["John", "Alice", "Bob", username];

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now(),
      username,
      message,
      timestamp: new Date().toLocaleTimeString(),
      isPrivate: false,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const handlePrivateChat = (targetUser: string) => {
    console.log("Starting private chat with:", targetUser);
    setSelectedChat(targetUser);
    
    if (!privateChats.find(chat => chat.userId === targetUser)) {
      setPrivateChats(prev => [...prev, {
        userId: targetUser,
        messages: []
      }]);
    }
  };

  const handleSendPrivateMessage = (message: string) => {
    if (!selectedChat) return;
    
    const newMessage = {
      id: Date.now(),
      username,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setPrivateChats(prev => prev.map(chat => 
      chat.userId === selectedChat
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    ));
  };

  const handleDeletePrivateMessage = (messageId: number) => {
    if (!selectedChat) return;
    
    setPrivateChats(prev => prev.map(chat => 
      chat.userId === selectedChat
        ? { ...chat, messages: chat.messages.filter(msg => msg.id !== messageId) }
        : chat
    ));
  };

  const currentPrivateChat = privateChats.find(chat => chat.userId === selectedChat);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-4">
        <ResizablePanelGroup direction="horizontal" className="min-h-[800px] rounded-lg border">
          <ResizablePanel defaultSize={60} className="p-4">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-semibold">Public Chat Room</h1>
              </div>
              
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    id={msg.id}
                    username={msg.username}
                    message={msg.message}
                    timestamp={msg.timestamp}
                    isPrivate={msg.isPrivate}
                    onDelete={handleDeleteMessage}
                  />
                ))}
              </div>
              
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </ResizablePanel>

          <ResizablePanel defaultSize={40} className="border-l">
            <div className="h-full p-4">
              <UsersList users={onlineUsers} onPrivateChat={handlePrivateChat} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Sheet open={selectedChat !== null} onOpenChange={() => setSelectedChat(null)}>
        <SheetContent side="right" className="w-[90vw] sm:w-[540px] p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-6 border-b">
              <SheetTitle>Chat with {selectedChat}</SheetTitle>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentPrivateChat?.messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  id={msg.id}
                  username={msg.username}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isPrivate={true}
                  onDelete={handleDeletePrivateMessage}
                />
              ))}
            </div>
            
            <div className="p-6 border-t">
              <ChatInput onSendMessage={handleSendPrivateMessage} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;