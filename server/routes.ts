import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatSessionSchema, insertChatMessageSchema } from "@shared/schema";
import { generateEmotionalSupportResponse } from "../client/src/lib/openai";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create new chat session
  app.post("/api/chat/session", async (req, res) => {
    try {
      const sessionId = nanoid();
      
      const session = await storage.createChatSession({
        sessionId,
        isActive: true,
        remainingTime: 300, // 5 minutes
        endTime: null,
      });

      res.json({ 
        sessionId: session.sessionId,
        remainingTime: session.remainingTime,
        isActive: session.isActive
      });
    } catch (error) {
      console.error("Error creating chat session:", error);
      res.status(500).json({ 
        message: "Erro interno do servidor ao criar sessão" 
      });
    }
  });

  // Get chat session
  app.get("/api/chat/session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getChatSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ 
          message: "Sessão não encontrada" 
        });
      }

      // Calculate remaining time based on start time
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - session.startTime.getTime()) / 1000);
      const remainingTime = Math.max(0, 300 - elapsedSeconds);

      // Update remaining time in storage
      const updatedSession = await storage.updateChatSession(sessionId, {
        remainingTime,
        isActive: remainingTime > 0,
        endTime: remainingTime <= 0 ? now : null,
      });

      res.json({
        sessionId: updatedSession?.sessionId,
        remainingTime: updatedSession?.remainingTime,
        isActive: updatedSession?.isActive,
        startTime: updatedSession?.startTime,
        endTime: updatedSession?.endTime,
      });
    } catch (error) {
      console.error("Error getting chat session:", error);
      res.status(500).json({ 
        message: "Erro interno do servidor ao buscar sessão" 
      });
    }
  });

  // Send message and get AI response
  app.post("/api/chat/message", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const { sessionId, content } = validatedData;

      // Check if session exists and is active
      const session = await storage.getChatSession(sessionId);
      if (!session) {
        return res.status(404).json({ 
          message: "Sessão não encontrada" 
        });
      }

      // Check remaining time
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - session.startTime.getTime()) / 1000);
      const remainingTime = Math.max(0, 300 - elapsedSeconds);

      if (remainingTime <= 0) {
        return res.status(400).json({ 
          message: "Tempo da sessão expirado" 
        });
      }

      // Save user message
      const userMessage = await storage.createChatMessage({
        sessionId,
        role: "user",
        content,
      });

      // Get conversation history for context
      const messages = await storage.getChatMessages(sessionId);
      const conversationHistory = messages
        .filter(msg => msg.id !== userMessage.id) // Exclude the just-added message
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }));

      // Generate AI response
      const aiResponse = await generateEmotionalSupportResponse(content, conversationHistory);

      // Save AI response
      const assistantMessage = await storage.createChatMessage({
        sessionId,
        role: "assistant", 
        content: aiResponse,
      });

      // Update remaining time
      await storage.updateChatSession(sessionId, {
        remainingTime,
        isActive: remainingTime > 0,
        endTime: remainingTime <= 0 ? now : null,
      });

      res.json({
        userMessage: {
          id: userMessage.id,
          content: userMessage.content,
          role: userMessage.role,
          timestamp: userMessage.timestamp,
        },
        assistantMessage: {
          id: assistantMessage.id,
          content: assistantMessage.content,
          role: assistantMessage.role,
          timestamp: assistantMessage.timestamp,
        },
        remainingTime,
      });
    } catch (error) {
      console.error("Error processing message:", error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Dados de entrada inválidos",
          errors: error.errors 
        });
      }

      res.status(500).json({ 
        message: "Erro interno do servidor ao processar mensagem" 
      });
    }
  });

  // Get messages for a session
  app.get("/api/chat/messages/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      // Check if session exists
      const session = await storage.getChatSession(sessionId);
      if (!session) {
        return res.status(404).json({ 
          message: "Sessão não encontrada" 
        });
      }

      const messages = await storage.getChatMessages(sessionId);
      
      const formattedMessages = messages.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      }));

      res.json(formattedMessages);
    } catch (error) {
      console.error("Error getting messages:", error);
      res.status(500).json({ 
        message: "Erro interno do servidor ao buscar mensagens" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
