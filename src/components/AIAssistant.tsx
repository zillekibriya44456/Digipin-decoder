"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, MapPin, Navigation } from "lucide-react"

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi! I'm DIGI, your location AI. Ask me to find nearby hospitals, decode a PIN, or generate one for any address!" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setInput("")
    setIsTyping(true)

    // Mock AI Response processing
    setTimeout(() => {
      let responseContent = "I can help with that! However, I am currently running in demo mode. Try asking about a specific DIGIPIN."
      
      if (userMessage.toLowerCase().includes("hospital")) {
        responseContent = "I found 3 hospitals nearby. The closest is City Hospital (1.2 km away). DIGIPIN: 8H2-K9L-M4N."
      } else if (userMessage.toLowerCase().includes("generate") || userMessage.toLowerCase().includes("mysore")) {
        responseContent = "The DIGIPIN for Mysore Palace is 73P-428-RJC8. It is located at 12.3052° N, 76.6552° E."
      }

      setMessages(prev => [...prev, { role: "ai", content: responseContent }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <Bot className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] glass bg-white/90 dark:bg-black/90 flex flex-col rounded-3xl overflow-hidden z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-bold">DIGI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-primary text-white rounded-br-sm" : "bg-black/5 dark:bg-white/10 text-foreground rounded-bl-sm"}`}>
                    {msg.content}
                    {msg.role === "ai" && msg.content.includes("DIGIPIN:") && (
                      <div className="mt-2 flex gap-2">
                        <button className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded text-primary font-medium hover:bg-white/40">
                          <MapPin className="w-3 h-3" /> Map
                        </button>
                        <button className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded text-primary font-medium hover:bg-white/40">
                          <Navigation className="w-3 h-3" /> Navigate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-black/5 dark:bg-white/10 p-3 rounded-2xl rounded-bl-sm flex gap-1">
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary text-sm"
                />
                <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg disabled:opacity-50">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
