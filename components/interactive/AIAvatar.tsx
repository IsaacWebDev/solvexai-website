'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles } from 'lucide-react'
import { LiquidGlassCard } from '@/components/ui'

export function AIAvatar() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const quickReplies = [
    "How much does this cost?",
    "What can you automate?",
    "How long does setup take?",
    "Do you offer support?"
  ]
  
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('much')) {
      return "Great question! We have 3 packages:\n\n🎨 Templates: $297-$497 (ready-made)\n⚡ Custom Build: $1,997+ (built for you)\n🤖 AI Receptionist: $1,997 setup + $297/mo\n\nWhich interests you most?"
    }
    
    if (lowerMessage.includes('automate') || lowerMessage.includes('what')) {
      return "We automate pretty much anything! 🚀\n\nEmail workflows, data entry, customer service, booking systems, social media, invoicing... you name it.\n\nWhat's eating up YOUR time right now?"
    }
    
    if (lowerMessage.includes('long') || lowerMessage.includes('time') || lowerMessage.includes('setup')) {
      return "Super fast! ⚡\n\n📄 Templates: 1-2 days\n⚙️ Custom builds: 1-3 weeks\n🤖 AI Receptionist: 3-5 days\n\nWe move quick so you can start saving time ASAP!"
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return "Absolutely! 💪\n\nAll packages include:\n✅ Setup support\n✅ Training videos\n✅ Email support\n✅ 30-day money-back guarantee\n\nWe've got your back!"
    }
    
    if (lowerMessage.includes('dance')) {
      return "💃 *does a little spin* 💫\n\nHaha! I'd love to, but I'm better at automating workflows than dancing. Want to see what I can REALLY do?"
    }
    
    return "That's a great question! 🤔\n\nI'm still learning, but I can definitely help you:\n\n• Understand our pricing\n• See what we automate\n• Book a discovery call\n\nWhat would you like to know more about?"
  }
  
  const handleSend = () => {
    if (!input.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setIsTyping(true)
    
    // Simulate AI typing delay
    setTimeout(() => {
      const response = getAIResponse(input)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }
  
  const handleQuickReply = (reply: string) => {
    setInput(reply)
    setTimeout(() => handleSend(), 100)
  }
  
  return (
    <>
      {/* Floating Avatar Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulsing Rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          
          {/* Icon */}
          <Sparkles className="w-8 h-8 text-white relative z-10" />
          
          {/* Notification Dot */}
          {!isOpen && messages.length === 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-28 right-8 z-50 w-96"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <LiquidGlassCard intensity="heavy" className="p-0 overflow-hidden shadow-2xl max-h-[600px] flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">AI Assistant</div>
                    <div className="text-white/80 text-xs">Always here to help</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">
                      Hey! I'm your AI assistant. Ask me anything about automation!
                    </p>
                  </motion.div>
                )}
                
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-white/5 text-white border border-white/10'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-pink-400 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Quick Replies */}
              {messages.length === 0 && (
                <div className="px-4 pb-4 space-y-2">
                  <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                  {quickReplies.map((reply, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleQuickReply(reply)}
                      className="block w-full text-left text-sm px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                      whileHover={{ x: 4 }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}
              
              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-xl disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
