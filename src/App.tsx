import React, { useState, useRef } from 'react';
import { 
  Download, 
  HelpCircle, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  Share2, 
  FileCheck2,
  RefreshCw,
  Cpu,
  Info,
  Smartphone
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { PhonePreview } from './components/PhonePreview';
import { SidebarControls } from './components/SidebarControls';
import { CHAT_PRESETS } from './presets';
import { Message, PhoneSettings, ContactSettings, TemplateType, ChatPreset } from './types';

export default function App() {
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Choose first preset as initial state
  const initialPreset = CHAT_PRESETS[0];

  const [template, setTemplate] = useState<TemplateType>(initialPreset.template);
  const [phoneSettings, setPhoneSettings] = useState<PhoneSettings>(initialPreset.phone);
  const [contactSettings, setContactSettings] = useState<ContactSettings>(initialPreset.contact);
  const [messages, setMessages] = useState<Message[]>(initialPreset.messages);
  
  // Controller settings
  const [showPhoneFrame, setShowPhoneFrame] = useState<boolean>(true);
  const [watermark, setWatermark] = useState<boolean>(false);
  
  // Loading status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load preset model
  const handleLoadPreset = (preset: ChatPreset) => {
    setTemplate(preset.template);
    setPhoneSettings(preset.phone);
    setContactSettings(preset.contact);
    setMessages(preset.messages);
    
    // Auto sync light-dark status bar based on preset theme choice
    setSuccessMsg(`Loaded "${preset.name}" template successfully!`);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 2500);
  };

  // Convert HTML container to crystal-clear 2x retina PNG
  const handleDownloadScreenshot = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    setSuccessMsg(null);

    // Give browser a short window to make sure fonts & dynamic sizes are settled
    setTimeout(async () => {
      try {
        const dataUrl = await toPng(previewRef.current!, {
          cacheBust: true,
          pixelRatio: 2.5, // Ultra-high 2.5x density for crystal clear social sharing
          backgroundColor: 'transparent',
          style: {
            transform: 'scale(1)',
          }
        });

        const safeContactName = contactSettings.name 
          ? contactSettings.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() 
          : 'chat';
        
        const link = document.createElement('a');
        link.download = `fakechat_${template}_${safeContactName}.png`;
        link.href = dataUrl;
        link.click();

        setSuccessMsg("✨ PNG downloaded successfully! Live cropping is perfect.");
      } catch (err) {
        console.error("Screenshot error:", err);
        setSuccessMsg("⚠️ Standard capture aborted; trying fallback high compatibility renderer.");
        
        // Fallback capture attempt
        try {
          const fallbackData = await toPng(previewRef.current!, {
            pixelRatio: 1.5,
            backgroundColor: 'transparent',
          });
          const link = document.createElement('a');
          link.download = `chat_${template}.png`;
          link.href = fallbackData;
          link.click();
          setSuccessMsg("✨ Downloaded with high compatibility render.");
        } catch (fError) {
          alert("Could not process HTML element capture: Please try inside a modern browser window or on a desktop screen size.");
        }
      } finally {
        setIsGenerating(false);
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    }, 200);
  };

  // Reset conversation list completely
  const handleResetChat = () => {
    if (window.confirm("Are you sure you want to clear all your current text bubbles?")) {
      setMessages([
        {
          id: 'init_sys',
          sender: 'them',
          type: 'system',
          text: 'Today 12:00 PM'
        },
        {
          id: 'init_msg',
          sender: 'them',
          type: 'text',
          text: 'Hi there! Tap the bubbles tab on the right to edit this text.'
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* LEFT: WORKING CANVAS CONSOLE */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto relative bg-[#0f172a] bg-radial-grid">
        
        {/* TITLE NAVIGATION HEADER BAR */}
        <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-md text-white">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight flex items-center gap-1.5 uppercase text-slate-100">
                FakeChat Studio <span className="text-[10px] bg-blue-500/20 text-blue-400 font-mono font-semibold px-1.5 py-0.5 rounded tracking-wide uppercase normal-case">PRO</span>
              </h1>
              <p className="text-[11px] text-slate-400">Generate pixel-perfect fake conversations in iMessage, WhatsApp, and Insta DMs</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="clear-chat-btn"
              onClick={handleResetChat}
              className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-xs font-bold transition-all border border-slate-750 flex items-center gap-1.5 cursor-pointer text-slate-300"
              title="Clear all text message bubbles"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              id="download-png-btn"
              disabled={isGenerating}
              onClick={handleDownloadScreenshot}
              className={`py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-black transition-all shadow-lg active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Generating 2x PNG...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Free PNG</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* FEEDBACK BANNER */}
        {successMsg && (
          <div id="status-bubble-msg" className="mx-6 mt-4 p-3 bg-slate-900 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-fade-in shadow-xl max-w-xl self-center z-10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium">{successMsg}</span>
          </div>
        )}

        {/* SCREEN WORKSPACE SECTION */}
        <div className="flex-1 flex flex-col justify-center items-center py-8 px-4 md:px-12 relative min-h-[640px]">
          
          {/* Main Visual Node Anchor */}
          <div className="relative group">
            <PhonePreview
              ref={previewRef}
              template={template}
              phoneSettings={phoneSettings}
              contactSettings={contactSettings}
              messages={messages}
              showPhoneFrame={showPhoneFrame}
              watermark={watermark}
            />
          </div>


        </div>

      </div>

      {/* RIGHT: CONTROL PANEL SIDEBAR */}
      <SidebarControls
        template={template}
        setTemplate={setTemplate}
        phoneSettings={phoneSettings}
        setPhoneSettings={setPhoneSettings}
        contactSettings={contactSettings}
        setContactSettings={setContactSettings}
        messages={messages}
        setMessages={setMessages}
        showPhoneFrame={showPhoneFrame}
        setShowPhoneFrame={setShowPhoneFrame}
        watermark={watermark}
        setWatermark={setWatermark}
        onLoadPreset={handleLoadPreset}
      />

    </div>
  );
}
