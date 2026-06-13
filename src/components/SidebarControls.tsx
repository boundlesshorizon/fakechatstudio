import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  User, 
  Smartphone, 
  MessageSquare, 
  Sliders, 
  Moon, 
  Sun, 
  Upload, 
  HelpCircle,
  Copy,
  FolderOpen
} from 'lucide-react';
import { TemplateType, ThemeMode, Message, PhoneSettings, ContactSettings, ChatPreset, MessageStatus, MessageType } from '../types';
import { CHAT_PRESETS } from '../presets';

interface SidebarControlsProps {
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
  phoneSettings: PhoneSettings;
  setPhoneSettings: React.Dispatch<React.SetStateAction<PhoneSettings>>;
  contactSettings: ContactSettings;
  setContactSettings: React.Dispatch<React.SetStateAction<ContactSettings>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  showPhoneFrame: boolean;
  setShowPhoneFrame: (val: boolean) => void;
  watermark: boolean;
  setWatermark: (val: boolean) => void;
  onLoadPreset: (preset: ChatPreset) => void;
}

// Curated library of funny background images for prank attachments
const FUNNY_ATTACHMENTS = [
  { name: "Private Jet", url: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&auto=format&fit=crop&q=60" },
  { name: "Broken Phone Screen", url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=60" },
  { name: "Stack of Cash", url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=60" },
  { name: "Funny Dog Confused", url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=60" },
  { name: "Aesthetic Coffee Spot", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=60" }
];

const PRESET_AVATAR_COLORS = [
  '#007aff', '#34c759', '#ff9500', '#ff2d55', '#af52de', '#5856d6', '#059669', '#dc2626', '#4f46e5', '#3b82f6'
];

export const SidebarControls: React.FC<SidebarControlsProps> = ({
  template,
  setTemplate,
  phoneSettings,
  setPhoneSettings,
  contactSettings,
  setContactSettings,
  messages,
  setMessages,
  showPhoneFrame,
  setShowPhoneFrame,
  watermark,
  setWatermark,
  onLoadPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'design' | 'profile' | 'messages'>('messages');

  // Triggered when editing field in Phone Settings
  const updatePhone = (fields: Partial<PhoneSettings>) => {
    setPhoneSettings(prev => ({ ...prev, ...fields }));
  };

  // Triggered when editing field in Contact
  const updateContact = (fields: Partial<ContactSettings>) => {
    setContactSettings(prev => ({ ...prev, ...fields }));
  };

  // Add a new message bubble
  const handleAddMessage = (type: MessageType = 'text') => {
    const defaultText = type === 'system' 
      ? 'Today 12:00 PM' 
      : type === 'image' 
        ? 'Prank Attachment' 
        : 'New message';

    const newMsg: Message = {
      id: `m_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      sender: messages.length > 0 && messages[messages.length - 1].sender === 'me' ? 'them' : 'me',
      type,
      text: type === 'image' ? '' : defaultText,
      imageUrl: type === 'image' ? FUNNY_ATTACHMENTS[1].url : undefined,
      time: template === 'whatsapp' ? '12:00' : 'Delivered',
      status: 'read'
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Delete message at index
  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Edit message field
  const handleEditMessageField = (id: string, field: keyof Message, value: any) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  // Move message Up or Down in sorting list
  const handleMoveMessage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === messages.length - 1) return;

    const newMsgs = [...messages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newMsgs[index];
    newMsgs[index] = newMsgs[targetIndex];
    newMsgs[targetIndex] = temp;
    
    setMessages(newMsgs);
  };

  // Set the current time in settings to current local clock time
  const setToLocalTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    if (template === 'whatsapp') {
      const formattedHours = hours.toString().padStart(2, '0');
      updatePhone({ time: `${formattedHours}:${minutes}` });
    } else {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 hour is 12
      updatePhone({ time: `${hours}:${minutes} ${ampm}` });
    }
  };

  return (
    <div className="w-full lg:w-[410px] bg-slate-900 border-l border-slate-800 flex flex-col h-full text-slate-100 shrink-0">
      
      {/* TABS HEADER */}
      <div className="flex border-b border-slate-800 bg-slate-950 p-1 shrink-0">
        <button 
          id="tab-btn-presets"
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase rounded-md flex flex-col items-center gap-1 transition-all ${
            activeTab === 'presets' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>Presets</span>
        </button>
        <button 
          id="tab-btn-messages"
          onClick={() => setActiveTab('messages')}
          className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase rounded-md flex flex-col items-center gap-1 transition-all ${
            activeTab === 'messages' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Messages ({messages.length})</span>
        </button>
        <button 
          id="tab-btn-design"
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase rounded-md flex flex-col items-center gap-1 transition-all ${
            activeTab === 'design' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Setup Layout</span>
        </button>
        <button 
          id="tab-btn-profile"
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase rounded-md flex flex-col items-center gap-1 transition-all ${
            activeTab === 'profile' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Header/Phone</span>
        </button>
      </div>

      {/* CORE CONTROLLER SCROLL CONTAINER */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">

        {/* ==================== TAB: PRESETS ==================== */}
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <div className="bg-slate-800/40 border border-slate-700/80 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Quick Prank Templates
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click any pre-built scenario below to load editable messages instantly. Change names, texts, themes and have fun!
              </p>
            </div>

            <div className="space-y-3">
              {CHAT_PRESETS.map((preset, index) => (
                <button
                  key={index}
                  id={`preset-button-${index}`}
                  onClick={() => onLoadPreset(preset)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-850/80 hover:border-slate-700 transition-all group flex flex-col gap-1 cursor-pointer"
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">
                      {preset.name}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {preset.template}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 line-clamp-2">
                    {preset.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB: DESIGN LAYOUT ==================== */}
        {activeTab === 'design' && (
          <div className="space-y-5">
            {/* 1. Select Template System */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider uppercase text-slate-400">
                1. Select Chat Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'imessage', label: 'iMessage (Apple)' },
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'instagram', label: 'Instagram DM' },
                  { id: 'messenger', label: 'Messenger' }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`template-opt-${item.id}`}
                    onClick={() => setTemplate(item.id as TemplateType)}
                    className={`p-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      template === item.id 
                        ? 'border-blue-500 bg-blue-600/10 text-blue-300' 
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Theme Mode Selection */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold tracking-wider uppercase text-slate-400">
                2. Style Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="theme-light-btn"
                  onClick={() => updatePhone({ theme: 'light' })}
                  className={`p-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 cursor-pointer ${
                    phoneSettings.theme === 'light' 
                      ? 'border-amber-500/80 bg-amber-500/10 text-amber-300' 
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-750'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </button>
                <button
                  id="theme-dark-btn"
                  onClick={() => updatePhone({ theme: 'dark' })}
                  className={`p-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 cursor-pointer ${
                    phoneSettings.theme === 'dark' 
                      ? 'border-blue-500 bg-blue-600/10 text-blue-300' 
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-750'
                  }`}
                >
                  <Moon className="w-4 h-4 text-violet-400" />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>

            {/* 3. Toggles */}
            <div className="space-y-4 pt-3 border-t border-slate-800">
              <label className="text-xs font-bold tracking-wider uppercase text-slate-400">
                3. Device Setup & Extra layers
              </label>
              
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-850">
                {/* Physical Bezel Frame */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">Device Bezel Mockup</span>
                    <span className="text-[10px] text-slate-400">Wrap screenshot inside high-quality smartphone frame</span>
                  </div>
                  <input 
                    type="checkbox" 
                    id="toggle-bezel-frame"
                    checked={showPhoneFrame}
                    onChange={(e) => setShowPhoneFrame(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Show Phone Status bar */}
                <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">Phone Status Bar</span>
                    <span className="text-[10px] text-slate-400">Show operator signal, clock, wifi, and battery outline</span>
                  </div>
                  <input 
                    type="checkbox" 
                    id="toggle-status-bar"
                    checked={phoneSettings.showStatusBar}
                    onChange={(e) => updatePhone({ showStatusBar: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Show Message input block */}
                <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">Show Chat Bottom Input Bar</span>
                    <span className="text-[10px] text-slate-400">Mimic dynamic chat mic, send, camera buttons</span>
                  </div>
                  <input 
                    type="checkbox" 
                    id="toggle-input-bar"
                    checked={phoneSettings.showInputBar}
                    onChange={(e) => updatePhone({ showInputBar: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Subtle watermark layer */}
                <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">Subtle Premium Watermark</span>
                    <span className="text-[10px] text-slate-400">Renders small "generated with FakeChat" script at bottom</span>
                  </div>
                  <input 
                    type="checkbox" 
                    id="toggle-watermark"
                    checked={watermark}
                    onChange={(e) => setWatermark(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: CONTACT & PHONE SYSTEM ==================== */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            
            {/* Contact details */}
            <div className="space-y-3 bg-slate-950/65 p-4 rounded-xl border border-slate-850">
              <h4 className="text-xs font-bold uppercase text-blue-400 tracking-wider">Contact Profile Details</h4>
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-slate-400 font-semibold">Contact Name</label>
                <input 
                  type="text"
                  id="contact-name-input"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  value={contactSettings.name}
                  onChange={(e) => updateContact({ name: e.target.value })}
                  placeholder="e.g. Boss Man, Mom"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-slate-400 font-semibold">Network Subtext / Status</label>
                <input 
                  type="text"
                  id="contact-status-input"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  value={contactSettings.statusText}
                  onChange={(e) => updateContact({ statusText: e.target.value })}
                  placeholder="e.g. online, typing... active 5m ago"
                />
                
                {/* Status Shortcuts */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['online', 'typing...', 'Active now', 'Active 10m ago'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      id={`preset-status-${st.replace(/\s+/g, '-').replace(/\.\.\./g, '')}`}
                      onClick={() => updateContact({ statusText: st })}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[9px] text-slate-300 font-medium cursor-pointer"
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Avatar */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-semibold text-slate-300">Show Contact Avatar Circle</span>
                <input 
                  type="checkbox"
                  id="toggle-avatar-circle"
                  checked={contactSettings.showAvatar}
                  onChange={(e) => updateContact({ showAvatar: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Avatar URL / Color builder */}
              {contactSettings.showAvatar && (
                <div className="space-y-3 pt-2 border-t border-slate-800/60">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-400 font-semibold">Avatar Image URL (Optional)</label>
                    <input 
                      type="text"
                      id="contact-avatar-input"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                      value={contactSettings.avatarUrl}
                      onChange={(e) => updateContact({ avatarUrl: e.target.value })}
                      placeholder="Paste image link e.g. https://..."
                    />
                    <span className="text-[9px] text-slate-500 block">Leave blank to generate beautiful fallback monogram with back color.</span>
                  </div>

                  {/* Backup colors */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-400 font-semibold">Mock Avatar Color Fallback</label>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_AVATAR_COLORS.map((col) => (
                        <button
                          key={col}
                          type="button"
                          id={`avatar-color-${col.replace('#', '')}`}
                          onClick={() => updateContact({ avatarColor: col })}
                          className={`w-[18px] h-[18px] rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                            contactSettings.avatarColor === col ? 'border-white scale-110' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hardware/Network Indicators */}
            <div className="space-y-3 bg-slate-950/65 p-4 rounded-xl border border-slate-850">
              <h4 className="text-xs font-bold uppercase text-violet-400 tracking-wider">Top Bar & Network Settings</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold">Carrier / Logo</label>
                  <input 
                    type="text"
                    id="carrier-input"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    value={phoneSettings.carrier}
                    onChange={(e) => updatePhone({ carrier: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold">Clock Network Time</label>
                  <div className="flex gap-1.5">
                    <input 
                      type="text"
                      id="clock-time-input"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                      value={phoneSettings.time}
                      onChange={(e) => updatePhone({ time: e.target.value })}
                    />
                    <button
                      type="button"
                      id="btn-local-time-now"
                      onClick={setToLocalTime}
                      className="px-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold rounded-lg cursor-pointer"
                    >
                      Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider Signal strength */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] uppercase text-slate-400 font-semibold">
                  <span>Cell Strength</span>
                  <span className="text-slate-300 font-bold">{phoneSettings.signalStrength} / 4 bars</span>
                </div>
                <input 
                  type="range"
                  id="signal-strength-slider"
                  min="1"
                  max="4"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  value={phoneSettings.signalStrength}
                  onChange={(e) => updatePhone({ signalStrength: parseInt(e.target.value) })}
                />
              </div>

              {/* Slider WiFi strength */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] uppercase text-slate-400 font-semibold">
                  <span>WiFi Strength</span>
                  <span className="text-slate-300 font-bold">{phoneSettings.wifiStrength} / 3 level</span>
                </div>
                <input 
                  type="range"
                  id="wifi-strength-slider"
                  min="0"
                  max="3"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  value={phoneSettings.wifiStrength}
                  onChange={(e) => updatePhone({ wifiStrength: parseInt(e.target.value) })}
                />
              </div>

              {/* Network type selector */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-slate-400 font-semibold">Network Speed Header</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['5G', 'LTE', '4G', 'WiFi'] as const).map((net) => (
                    <button
                      key={net}
                      type="button"
                      id={`network-type-opt-${net}`}
                      onClick={() => updatePhone({ networkType: net })}
                      className={`py-1 rounded text-xs font-semibold cursor-pointer ${
                        phoneSettings.networkType === net 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {net}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider battery */}
              <div className="space-y-1 border-t border-slate-800/80 pt-2.5">
                <div className="flex justify-between items-center text-[10px] uppercase text-slate-400 font-semibold">
                  <span>Battery Percentage</span>
                  <span className="text-slate-300 font-bold">{phoneSettings.batteryLevel}%</span>
                </div>
                <input 
                  type="range"
                  id="battery-percentage-slider"
                  min="1"
                  max="100"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  value={phoneSettings.batteryLevel}
                  onChange={(e) => updatePhone({ batteryLevel: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-300">Simulate Battery Charging</span>
                <input 
                  type="checkbox"
                  id="toggle-battery-charging"
                  checked={phoneSettings.batteryCharging}
                  onChange={(e) => updatePhone({ batteryCharging: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB: BUBBLE MESSAGES EDITOR ==================== */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            
            {/* Quick adding builders */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-wrap gap-2 justify-between">
              <button
                type="button"
                id="btn-add-txt-msg"
                onClick={() => handleAddMessage('text')}
                className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-white"
              >
                <Plus className="w-3.5 h-3.5" />
                Text Bubble
              </button>
              
              <button
                type="button"
                id="btn-add-img-msg"
                onClick={() => handleAddMessage('image')}
                className="flex-1 py-2 px-3 bg-[#6366f1]/90 hover:bg-[#6366f1] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-white"
              >
                <Plus className="w-3.5 h-3.5" />
                Image Message
              </button>

              <button
                type="button"
                id="btn-add-sys-msg"
                onClick={() => handleAddMessage('system')}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-slate-300 border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" />
                System Date/Spacer Line
              </button>
            </div>

            {/* Bubble items list */}
            <div className="space-y-4 pt-1">
              <label className="text-xs font-bold tracking-wider uppercase text-slate-400">
                Message Bubbles Flow ({messages.length})
              </label>
              
              {messages.length === 0 ? (
                <div className="text-center py-8 bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs text-semibold">
                  No messages! Add bubbles above or load a quick preset template.
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                  {messages.map((msg, index) => (
                    <div 
                      key={msg.id}
                      id={`msg-edit-block-${msg.id}`}
                      className={`p-3.5 rounded-xl border flex flex-col gap-2.5 transition-all relative ${
                        msg.sender === 'me' 
                          ? 'bg-blue-600/5 border-blue-500/30' 
                          : msg.type === 'system' 
                            ? 'bg-slate-800/10 border-slate-800' 
                            : 'bg-emerald-500/5 border-emerald-500/20'
                      }`}
                    >
                      {/* Top bar controls */}
                      <div className="flex justify-between items-center">
                        {/* Bubble identity header */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase">
                            No. {index + 1}
                          </span>
                          
                          {msg.type !== 'system' && (
                            <button
                              type="button"
                              id={`toggle-sender-btn-${msg.id}`}
                              onClick={() => handleEditMessageField(msg.id, 'sender', msg.sender === 'me' ? 'them' : 'me')}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                                msg.sender === 'me' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-emerald-600 text-white'
                              }`}
                            >
                              {msg.sender === 'me' ? 'Sender (Me - Right)' : 'Receiver (Them - Left)'}
                            </button>
                          )}

                          {msg.type === 'system' && (
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Date / Divider Text
                            </span>
                          )}
                        </div>

                        {/* Order & Delete */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            id={`move-up-btn-${msg.id}`}
                            onClick={() => handleMoveMessage(index, 'up')}
                            disabled={index === 0}
                            className="p-1 bg-slate-850 hover:bg-slate-750 text-slate-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-slate-850 disabled:hover:text-slate-400 cursor-pointer"
                            title="Move Bubble Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            id={`move-down-btn-${msg.id}`}
                            onClick={() => handleMoveMessage(index, 'down')}
                            disabled={index === messages.length - 1}
                            className="p-1 bg-slate-850 hover:bg-slate-750 text-slate-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-slate-850 disabled:hover:text-slate-400 cursor-pointer"
                            title="Move Bubble Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            id={`delete-btn-${msg.id}`}
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 bg-red-950 hover:bg-red-900 border border-red-900/50 text-red-400 hover:text-red-300 rounded cursor-pointer"
                            title="Delete Bubble"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content editor */}
                      {msg.type !== 'image' ? (
                        <div className="space-y-1">
                          <textarea
                            id={`msg-textarea-${msg.id}`}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-slate-600"
                            value={msg.text}
                            onChange={(e) => handleEditMessageField(msg.id, 'text', e.target.value)}
                            rows={2}
                          />
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase text-slate-400 font-semibold">Image URL</label>
                            <input 
                              type="text"
                              id={`msg-image-url-${msg.id}`}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-slate-600"
                              value={msg.imageUrl}
                              onChange={(e) => handleEditMessageField(msg.id, 'imageUrl', e.target.value)}
                            />
                          </div>

                          {/* Quick attach library */}
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase text-slate-500 font-semibold">Meme/Prank Image Library Quick Presets</label>
                            <div className="flex flex-wrap gap-1 leading-none">
                              {FUNNY_ATTACHMENTS.map((pic) => (
                                <button
                                  key={pic.name}
                                  type="button"
                                  id={`quick-img-${pic.name.replace(/\s+/g, '-')}-${msg.id}`}
                                  onClick={() => handleEditMessageField(msg.id, 'imageUrl', pic.url)}
                                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-medium rounded truncate max-w-[110px] cursor-pointer"
                                >
                                  {pic.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Optional cap text with image */}
                          <div className="space-y-1 mt-1">
                            <label className="text-[9px] uppercase text-slate-400 font-semibold">Message bubble text combined under picture</label>
                            <input 
                              type="text"
                              id={`msg-image-caption-${msg.id}`}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-slate-600"
                              value={msg.text}
                              onChange={(e) => handleEditMessageField(msg.id, 'text', e.target.value)}
                              placeholder="e.g. Private Jet life! (Optional caption)"
                            />
                          </div>
                        </div>
                      )}

                      {/* Delivery Status and Time for specific bubble */}
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase text-slate-400 font-semibold">Bubble Time Stamp</label>
                          <input 
                            type="text"
                            id={`msg-time-${msg.id}`}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[10px] text-slate-300"
                            value={msg.time || ''}
                            placeholder="e.g. 10:24 AM, Read, Yesterday"
                            onChange={(e) => handleEditMessageField(msg.id, 'time', e.target.value)}
                          />
                        </div>

                        {msg.type !== 'system' && (
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase text-slate-400 font-semibold">iMessage/WhatsApp Checks</label>
                            <select
                              id={`msg-status-${msg.id}`}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[10px] text-slate-300"
                              value={msg.status || 'none'}
                              onChange={(e) => handleEditMessageField(msg.id, 'status', e.target.value as MessageStatus)}
                            >
                              <option value="none">None</option>
                              <option value="sent">Sent ✔</option>
                              <option value="delivered">Delivered ✔✔</option>
                              <option value="read">Read (Blue ✔✔)</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* FOOTER INFO - PROUD SPONSOR STATEMENT */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 text-center text-[10px] text-slate-500 flex flex-col gap-1 items-center justify-center">
        <span>Build with absolute precision. All details of templates are fully compliant.</span>
        <span className="text-blue-500 font-mono text-[9px]">Fake Chat Screenshot Studio v2.4</span>
      </div>

    </div>
  );
};
