import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Bot, 
  User, 
  AlertCircle,
  HelpCircle,
  Code
} from 'lucide-react';
import { ChatMessage } from '../types';
import { apiService } from '../services/api';

export const AILabView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: `Hello! I am **Himanshu's AI Study Assistant** powered by Google Gemini 3.8 Flash.\n\nI can help you break down complex computer science problems, explain algorithms, audit web code, or suggest personalized study guides for the **StudyHub** platform. What would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'Explain the difference between QuickSort and MergeSort with Big-O complexities.',
    'How do React 19 Server Components differ from standard Client Components?',
    'Give me a 4-week study roadmap for mastering Trees and Graph algorithms.',
    'What are the core principles of responsive web design with CSS Flexbox & Grid?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setErrorMessage('');
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = newHistory.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await apiService.sendAiMessage(text, historyPayload);
      
      const aiMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'model',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newHistory, aiMsg]);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to communicate with AI server. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.confirm('Reset this conversation?')) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'model',
          text: 'Conversation cleared. How can I assist your studies today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setErrorMessage('');
    }
  };

  // Helper to format basic markdown (bold, code blocks, lists) safely
  const renderFormattedText = (raw: string) => {
    // Check if code block exists
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(raw)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: raw.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'code', content: match[1] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < raw.length) {
      parts.push({ type: 'text', content: raw.substring(lastIndex) });
    }

    return (
      <div className="space-y-3 leading-relaxed text-xs sm:text-sm">
        {parts.map((p, idx) => {
          if (p.type === 'code') {
            return (
              <pre key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-300 text-xs overflow-x-auto my-2">
                <code>{p.content.trim()}</code>
              </pre>
            );
          }

          // Handle inline formatting (bold, newlines, bullet points)
          const lines = p.content.split('\n');
          return (
            <div key={idx} className="space-y-1.5">
              {lines.map((line, lIdx) => {
                if (!line.trim()) return <div key={lIdx} className="h-1" />;
                
                // Bold formatting
                const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');

                return (
                  <p
                    key={lIdx}
                    className={isBullet ? 'pl-4 relative before:content-["•"] before:absolute before:left-1 before:text-cyan-400' : ''}
                    dangerouslySetInnerHTML={{ __html: isBullet ? formattedLine.replace(/^[\*\-]\s+/, '') : formattedLine }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI Study Lab &amp; Code Copilot
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-time conversational assistant powered by Google Gemini 3.8 Flash via server-side execution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Suggested Prompts Strip */}
      <div className="space-y-2">
        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Quick CS Questions to Try:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-left p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
            >
              <span className="line-clamp-1">{prompt}</span>
              <Terminal className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages Pane */}
      <div className="rounded-2xl bg-[#070d1e] border border-slate-800 p-4 sm:p-6 min-h-[450px] max-h-[600px] overflow-y-auto space-y-6 shadow-2xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shrink-0 text-slate-950 font-bold shadow-md">
                <Bot className="w-4 h-4 text-slate-950" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 space-y-2 relative group shadow-md ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[11px] text-slate-400 border-b border-slate-800/50 pb-1.5 mb-2">
                <span className="font-semibold text-slate-300">
                  {msg.role === 'user' ? 'You (Student)' : 'Gemini 3.8 Flash'}
                </span>
                <span className="font-mono text-[10px]">{msg.timestamp}</span>
              </div>

              {renderFormattedText(msg.text)}

              {/* Copy action for AI messages */}
              {msg.role === 'model' && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleCopyText(msg.id, msg.text)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors p-1"
                    title="Copy AI response"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3.5 items-center text-slate-400 text-xs">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Gemini 3.8 Flash is analyzing your question...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => handleSendMessage()}
              className="px-3 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="relative rounded-2xl bg-[#091024] border border-slate-800 p-3 shadow-xl">
        <textarea
          rows={2}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about computer science, algorithms, or StudyHub (Press Enter to send)..."
          className="w-full bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none resize-none leading-relaxed pr-14"
        />

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Shift + Enter for new line</span>
            <span>·</span>
            <span>Model: Gemini 3.8 Flash</span>
          </div>

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              inputMessage.trim() && !isLoading
                ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
