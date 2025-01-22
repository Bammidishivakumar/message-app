import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { UsersList } from "@/components/UsersList";
import { MessageCircle, Users } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface PrivateChat {
  userId: string;
  messages: Array<{
    id: number;
    username: string;
    message: string;
    timestamp: string;
  }>;
}

const Index = () => {
  const [messages, setMessages] = useState<Array<{
    id: number;
    username: string;
    message: string;
    timestamp: string;
    isPrivate?: boolean;
  }>>([]);
  
  const [username] = useState("Guest" + Math.floor(Math.random() * 1000));
  const [privateChats, setPrivateChats] = useState<PrivateChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  
  // Simulated online users
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

  const handlePrivateChat = (targetUser: string) => {
    console.log("Starting private chat with:", targetUser);
    setSelectedChat(targetUser);
    
    // Initialize private chat if it doesn't exist
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

  const currentPrivateChat = privateChats.find(chat => chat.userId === selectedChat);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Public Chat Area */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-semibold">Public Chat Room</h1>
              </div>
              
              {/* Messages Container */}
              <div className="h-[600px] overflow-y-auto mb-4 space-y-4">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    username={msg.username}
                    message={msg.message}
                    timestamp={msg.timestamp}
                    isPrivate={msg.isPrivate}
                  />
                ))}
              </div>
              
              {/* Chat Input */}
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </div>
          
          {/* Online Users Sidebar */}
          <div className="col-span-4">
            <UsersList users={onlineUsers} onPrivateChat={handlePrivateChat} />
          </div>
        </div>
      </div>

      {/* Private Chat Sheet */}
      <Sheet open={selectedChat !== null} onOpenChange={() => setSelectedChat(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Chat with {selectedChat}</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex-1 overflow-y-auto space-y-4">
              {currentPrivateChat?.messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  username={msg.username}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isPrivate={true}
                />
              ))}
            </div>
            
            <div className="pt-4">
              <ChatInput onSendMessage={handleSendPrivateMessage} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;