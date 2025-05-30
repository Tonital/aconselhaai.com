import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Bot, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  // Get session data
  const { data: sessionData, isLoading: sessionLoading } = useQuery({
    queryKey: [`/api/chat/session/${sessionId}`],
    enabled: !!sessionId && isOpen,
  });

  // Get messages for the session
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: [`/api/chat/messages/${sessionId}`],
    enabled: !!sessionId && isOpen,
  });

  // Create new session mutation
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/chat/session", {});
      return response.json();
    },
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      setRemainingTime(data.remainingTime);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível iniciar a sessão. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/chat/message", {
        sessionId,
        content,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/chat/messages/${sessionId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/chat/session/${sessionId}`] });
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Initialize session when modal opens
  useEffect(() => {
    if (isOpen && !sessionId) {
      createSessionMutation.mutate();
    }
  }, [isOpen]);

  // Update remaining time from session data
  useEffect(() => {
    if (sessionData?.remainingTime !== undefined) {
      setRemainingTime(sessionData.remainingTime);
    }
  }, [sessionData]);

  // Timer countdown
  useEffect(() => {
    if (isOpen && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isOpen, remainingTime]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSessionEnd = () => {
    toast({
      title: "Teste finalizado",
      description: "Seu teste grátis de 5 minutos terminou! Esperamos que tenha gostado da experiência.",
    });
  };

  const handleClose = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setSessionId("");
    setRemainingTime(300);
    setMessage("");
    onClose();
  };

  const handleSend = () => {
    if (!message.trim() || remainingTime <= 0 || sendMessageMutation.isPending) return;
    
    setIsTyping(true);
    sendMessageMutation.mutate(message.trim());
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Teste Grátis - 5 minutos</h3>
                <p className="text-white/80 text-sm">
                  Tempo restante: {formatTime(remainingTime)}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleClose}
              className="text-white/80 hover:text-white hover:bg-white/20"
            >
              <X />
            </Button>
          </div>
        </div>
        
        {/* Chat Messages Container */}
        <CardContent className="p-6 h-80 overflow-y-auto bg-gray-50">
          {sessionLoading || messagesLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-slate-500">Carregando conversa...</div>
            </div>
          ) : (
            <>
              {/* Initial AI message if no messages */}
              {messages.length === 0 && (
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="text-white text-xs" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-xs">
                    <p className="text-slate-700">
                      Olá! Estou aqui para conversar com você sobre como está se sentindo. O que trouxe você aqui hoje?
                    </p>
                    <span className="text-xs text-slate-400 mt-2 block">Agora mesmo</span>
                  </div>
                </div>
              )}
              
              {/* Messages */}
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-3 mb-4 ${
                    msg.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="text-white text-xs" />
                    </div>
                  )}
                  <div className={`rounded-2xl p-4 shadow-sm max-w-xs ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white rounded-tr-sm' 
                      : 'bg-white text-slate-700 rounded-tl-sm'
                  }`}>
                    <p>{msg.content}</p>
                    <span className={`text-xs mt-2 block ${
                      msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                      <span className="text-slate-600 text-xs font-semibold">U</span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator */}
              {(isTyping || sendMessageMutation.isPending) && (
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="text-white text-xs" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </CardContent>
        
        {/* Chat Input */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <Input
              type="text"
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={remainingTime <= 0 || sendMessageMutation.isPending}
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              disabled={!message.trim() || remainingTime <= 0 || sendMessageMutation.isPending}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send size={16} />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Esta conversa é confidencial e não será armazenada.
          </p>
        </div>
      </Card>
    </div>
  );
}
