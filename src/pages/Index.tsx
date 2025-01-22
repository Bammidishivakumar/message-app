import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { UsersList } from "@/components/UsersList";
import { MessageCircle, Users } from "lucide-react";

const Index = () => {
  const [messages, setMessages] = useState<Array<{
    id: number;
    username: string;
    message: string;
    timestamp: string;
    isPrivate?: boolean;
  }>>([]);
  
  const [username, setUsername] = useState("Guest" + Math.floor(Math.random() * 1000));
  
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
    // This would typically open a private chat UI
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <UsersList users={onlineUsers} onPrivateChat={handlePrivateChat} />
          </div>
          
          {/* Main Chat Area */}
          <div className="col-span-9">
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
        </div>
      </div>
    </div>
  );
};

export default Index;