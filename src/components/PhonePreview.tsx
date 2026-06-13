import React, { forwardRef } from 'react';
import { 
  Wifi, 
  Signal, 
  Battery, 
  BatteryCharging, 
  ChevronLeft, 
  ArrowLeft, 
  Phone, 
  Video, 
  Info, 
  MoreVertical, 
  MoreHorizontal, 
  Camera, 
  Mic, 
  Inbox, 
  Image as ImageIcon, 
  Smile, 
  Send,
  Check,
  CheckCheck,
  Heart,
  Paperclip,
  Search
} from 'lucide-react';
import { Message, PhoneSettings, ContactSettings, TemplateType } from '../types';

interface PhonePreviewProps {
  template: TemplateType;
  phoneSettings: PhoneSettings;
  contactSettings: ContactSettings;
  messages: Message[];
  showPhoneFrame: boolean;
  watermark: boolean;
}

export const PhonePreview = forwardRef<HTMLDivElement, PhonePreviewProps>(({
  template,
  phoneSettings,
  contactSettings,
  messages,
  showPhoneFrame,
  watermark,
}, ref) => {
  const isDark = phoneSettings.theme === 'dark';

  // Helper to generate wifi index icon
  const renderWifiIcon = () => {
    return <Wifi className="w-3.5 h-3.5" />;
  };

  // Helper to render cellular signal bars
  const renderSignalBars = (strength: number) => {
    return (
      <div className="flex items-end gap-0.5 h-3">
        {[1, 2, 3, 4].map((bar) => (
          <span 
            key={bar} 
            className={`w-[2.5px] rounded-t-sm transition-all ${
              bar <= strength 
                ? (isDark ? 'bg-white' : 'bg-black') 
                : (isDark ? 'bg-white/20' : 'bg-black/20')
            }`}
            style={{ height: `${bar * 2.5 + 2}px` }}
          />
        ))}
      </div>
    );
  };

  // Helper to render avatar or fallback circle
  const renderAvatar = (sizeClass = "w-10 h-10 text-sm") => {
    if (!contactSettings.showAvatar) return null;

    if (contactSettings.avatarUrl) {
      return (
        <img 
          src={contactSettings.avatarUrl} 
          alt={contactSettings.name} 
          className={`${sizeClass} rounded-full object-cover border border-black/5 flex-shrink-0`}
          referrerPolicy="no-referrer"
        />
      );
    }

    const initial = contactSettings.name ? contactSettings.name.trim().charAt(0).toUpperCase() : '?';
    return (
      <div 
        className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white uppercase select-none flex-shrink-0 shadow-sm`}
        style={{ backgroundColor: contactSettings.avatarColor || '#3b82f6' }}
      >
        {initial}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Dynamic Watermark Advice (only displayed in live preview, not on the captured screenshot node) */}
      <div className="text-xs text-slate-400 mb-2 italic">
        {showPhoneFrame ? 'Phone Frame active. Capture output matches frame.' : 'Clean Aspect view. Perfect for quick high-quality cropping.'}
      </div>

      <div 
        ref={ref}
        id="screenshot-target"
        className={`relative transition-all duration-300 select-none ${
          showPhoneFrame 
            ? 'p-6 bg-slate-900/30 rounded-[55px] border-4 border-slate-700 shadow-2xl backdrop-blur-sm' 
            : 'shadow-lg border border-slate-200/50 dark:border-slate-800'
        }`}
        style={{ width: '380px' }}
      >
        {/* Device Notch/Speaker grill overlay - only if phone frame is on */}
        {showPhoneFrame && (
          <div className="absolute top-[30px] left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-center">
            {/* Dynamic Island style inner light reflection */}
            <div className="w-2.5 h-2.5 bg-zinc-950 rounded-full ml-12 opacity-80" />
            <div className="w-1 h-1 bg-blue-950/40 rounded-full ml-2" />
          </div>
        )}

        {/* Outer Phone Mockup viewport */}
        <div 
          className={`relative flex flex-col overflow-hidden w-[332px] h-[640px] mx-auto rounded-[38px] ${
            isDark ? 'bg-black text-white' : 'bg-white text-black'
          }`}
          style={{ fontFamily: template === 'whatsapp' ? 'sans-serif' : 'system-ui, -apple-system, sans-serif' }}
        >
          {/* 1. STATUS BAR */}
          {phoneSettings.showStatusBar && (
            <div className={`flex justify-between items-center px-6 pt-3 pb-2 text-xs font-semibold z-20 ${
              isDark ? 'text-white' : 'text-black'
            } ${template === 'whatsapp' && !isDark ? 'bg-[#075e54] text-white' : ''} ${template === 'whatsapp' && isDark ? 'bg-[#1f2c34] text-white' : ''}`}>
              {/* Left side: Time */}
              <div className="flex items-center min-w-[50px]">
                <span className="tracking-tight">{phoneSettings.time}</span>
              </div>

              {/* Center spacer if Notch is used */}
              <div className="w-20" />

              {/* Right side: Signal, Wifi, Battery */}
              <div className="flex items-center gap-1.5 min-w-[50px] justify-end">
                {renderSignalBars(phoneSettings.signalStrength)}
                <span className="text-[10px] uppercase tracking-tighter opacity-80">{phoneSettings.networkType}</span>
                {phoneSettings.networkType === 'WiFi' && renderWifiIcon()}
                
                {/* Battery Container */}
                <div className="flex items-center gap-0.5">
                  <span className="text-[9px] font-normal leading-none opacity-80">{phoneSettings.batteryLevel}%</span>
                  <div className={`relative w-5.5 h-3 rounded-sm border ${
                    template === 'whatsapp' && !isDark ? 'border-white/80' : (isDark ? 'border-white/80' : 'border-black/50')
                  } p-[1px]`}>
                    <div 
                      className={`h-full rounded-[1px] ${
                        phoneSettings.batteryCharging 
                          ? 'bg-green-500' 
                          : (phoneSettings.batteryLevel <= 20 ? 'bg-red-500' : (isDark || (template === 'whatsapp' && !isDark) ? 'bg-white' : 'bg-black'))
                      }`}
                      style={{ width: `${phoneSettings.batteryLevel}%` }}
                    />
                    {phoneSettings.batteryCharging && (
                      <BatteryCharging className="absolute -inset-0 m-auto w-2.5 h-2.5 text-green-400 stroke-[2.5]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. HEADER BAR PER TEMPLATE */}
          
          {/* A. iMESSAGE HEADER */}
          {template === 'imessage' && (
            <div className={`flex flex-col items-center border-b pt-1 pb-2 px-3 z-10 ${
              isDark ? 'bg-[#1c1c1e]/90 border-zinc-800' : 'bg-[#f6f6f6]/90 border-zinc-200'
            }`}>
              <div className="flex justify-between items-center w-full">
                {/* Back Link */}
                <div className="flex items-center text-[#007aff] cursor-pointer text-[15px] active:opacity-50">
                  <ChevronLeft className="w-6 h-6 -ml-1.5 stroke-[2.5]" />
                  <span className="text-sm font-medium -ml-0.5">Filter</span>
                </div>

                {/* Sub title / Name */}
                <div className="flex flex-col items-center flex-1 max-w-[160px]">
                  {contactSettings.showAvatar && (
                    <div className="scale-85 mb-1">
                      {renderAvatar("w-9 h-9 text-xs")}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[13px] tracking-tight truncate max-w-[120px]">
                      {contactSettings.name || 'Contact'}
                    </span>
                    <span className="text-zinc-400 text-[10px] font-bold tracking-tight">{'>'}</span>
                  </div>
                </div>

                {/* Info Right */}
                <div className="text-[#007aff] cursor-pointer active:opacity-50 flex items-center justify-end w-12 pr-1">
                  <div className="p-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50">
                    <Info className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
              </div>

              {/* iOS status text beneath */}
              {contactSettings.statusText && (
                <div className="text-[10px] text-zinc-400 mt-0.5 tracking-tight capitalize">
                  {contactSettings.statusText}
                </div>
              )}
            </div>
          )}

          {/* B. WHATSAPP HEADER */}
          {template === 'whatsapp' && (
            <div className={`flex items-center justify-between px-3 py-2.5 z-10 text-white shadow-sm ${
              isDark ? 'bg-[#1f2c34]' : 'bg-[#075e54]'
            }`}>
              <div className="flex items-center gap-1 max-w-[190px]">
                <ArrowLeft className="w-5 h-5 -ml-1 cursor-pointer" />
                <div className="flex items-center gap-2 cursor-pointer">
                  {renderAvatar("w-9 h-9 text-xs")}
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm leading-tight truncate max-w-[120px]">
                      {contactSettings.name || 'WhatsApp Contact'}
                    </span>
                    {contactSettings.statusText && (
                      <span className="text-[10px] opacity-85 leading-none mt-0.5 truncate max-w-[100px]">
                        {contactSettings.statusText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* WhatsApp Call / More icons */}
              <div className="flex items-center gap-3.5 text-white pr-1">
                <Video className="w-4 h-4 cursor-pointer" />
                <Phone className="w-4 h-4 cursor-pointer" />
                <MoreVertical className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          )}

          {/* C. INSTAGRAM DM HEADER */}
          {template === 'instagram' && (
            <div className={`flex items-center justify-between px-3.5 py-3 border-b z-10 ${
              isDark ? 'bg-[#000000] border-zinc-800' : 'bg-white border-zinc-100'
            }`}>
              <div className="flex items-center gap-3">
                <ChevronLeft className="w-6 h-6 stroke-[2.5] cursor-pointer" />
                <div className="flex items-center gap-2.5">
                  {renderAvatar("w-8 h-8 text-xs")}
                  <div className="flex flex-col">
                    <span className="font-bold text-[13.5px] leading-tight truncate max-w-[120px]">
                      {contactSettings.name || 'instagram_user'}
                    </span>
                    {contactSettings.statusText && (
                      <span className="text-[10px] text-zinc-400 leading-none">
                        {contactSettings.statusText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-inherit pr-0.5">
                <Phone className="w-[18px] h-[18px] stroke-[2]" />
                <Video className="w-[18px] h-[18px] stroke-[2]" />
                <Info className="w-[18px] h-[18px] stroke-[2]" />
              </div>
            </div>
          )}

          {/* D. MESSENGER HEADER */}
          {template === 'messenger' && (
            <div className={`flex items-center justify-between px-3 py-2.5 border-b z-10 shadow-sm ${
              isDark ? 'bg-[#181818] border-zinc-800/80' : 'bg-white border-zinc-100'
            }`}>
              <div className="flex items-center gap-2 max-w-[180px]">
                <ChevronLeft className="w-7 h-7 text-[#0084ff] cursor-pointer" />
                <div className="flex items-center gap-2">
                  {renderAvatar("w-9 h-9 text-xs")}
                  <div className="flex flex-col">
                    <span className="font-bold text-[14px] leading-tight truncate max-w-[110px]">
                      {contactSettings.name || 'Messenger User'}
                    </span>
                    {contactSettings.statusText && (
                      <span className="text-[10px] text-zinc-400 leading-none mt-0.5 truncate">
                        {contactSettings.statusText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#0084ff] pr-1">
                <Phone className="w-4 h-4 cursor-pointer stroke-[2.5]" />
                <Video className="w-4 h-4 cursor-pointer stroke-[2.5]" />
                <div className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Info className="w-3.5 h-3.5 text-inherit cursor-pointer stroke-[2.5]" />
                </div>
              </div>
            </div>
          )}

          {/* 3. CHAT BUBBLE CONVERSATION WINDOW AREA */}
          <div 
            className={`flex-1 overflow-y-auto px-3.5 py-4 flex flex-col space-y-3 scrollbar-none relative ${
              template === 'whatsapp' 
                ? (isDark 
                  ? "bg-[#0b141a]" 
                  : "bg-[#efeae2] WhatsApp-bg-doodle")
                : (template === 'instagram' && !isDark ? 'bg-white' : '')
            }`}
            style={{ 
              backgroundImage: template === 'whatsapp' && !isDark 
                ? 'radial-gradient(#dfdcd6 1px, transparent 1px)' 
                : undefined,
              backgroundSize: template === 'whatsapp' && !isDark ? '12px 12px' : undefined
            }}
          >
            {messages.map((msg, index) => {
              const previousMsg = index > 0 ? messages[index - 1] : null;
              const nextMsg = index < messages.length - 1 ? messages[index + 1] : null;
              
              // Determine if bubble has custom margin or visual group
              const isGroupSame = previousMsg && previousMsg.sender === msg.sender && previousMsg.type !== 'system';
              const isNextSame = nextMsg && nextMsg.sender === msg.sender && nextMsg.type !== 'system';

              // SYSTEM/TIMESTAMP TYPE
              if (msg.type === 'system') {
                return (
                  <div key={msg.id} className="w-full flex justify-center py-2">
                    {template === 'whatsapp' ? (
                      <div className={`px-2.5 py-1 rounded-[7px] text-[10.5px] font-medium shadow-sm border border-black/5 leading-none uppercase ${
                        isDark ? 'bg-[#182229] text-zinc-400' : 'bg-white/95 text-zinc-500'
                      }`}>
                        {msg.text}
                      </div>
                    ) : template === 'imessage' ? (
                      <div className="text-[11px] font-bold text-zinc-500 text-center tracking-tight capitalize select-none">
                        {msg.text}
                      </div>
                    ) : (
                      <div className="text-[11.5px] text-zinc-400 text-center font-medium my-1">
                        {msg.text}
                      </div>
                    )}
                  </div>
                );
              }

              // SENDER/RECEIVER BUBBLE CALCULATIONS
              const isMe = msg.sender === 'me';
              
              return (
                <div 
                  key={msg.id}
                  className={`flex w-full items-end gap-1.5 ${isMe ? 'justify-end' : 'justify-start'} ${
                    isGroupSame ? '-mt-1.5' : 'mt-1'
                  }`}
                >
                  {/* Left Avatar (messenger sometimes puts mini avatar on left) */}
                  {!isMe && template === 'messenger' && !isNextSame && (
                    <div className="scale-70 -ml-1">
                      {renderAvatar("w-7 h-7 text-xs")}
                    </div>
                  )}

                  {/* Spacer if messenger avatar was omitted on previous items of group */}
                  {!isMe && template === 'messenger' && isNextSame && (
                    <div className="w-5" />
                  )}

                  {/* Bubble content */}
                  <div className="flex flex-col max-w-[76%] group relative">
                    
                    {/* Render Image Message */}
                    {msg.type === 'image' && msg.imageUrl && (
                      <div className={`overflow-hidden rounded-2xl shadow-sm border ${
                        isDark ? 'border-zinc-800' : 'border-zinc-200'
                      }`}>
                        <img 
                          src={msg.imageUrl} 
                          alt="shared" 
                          className="max-w-[190px] max-h-[190px] object-cover rounded-2xl" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* Render Text / Subtext Bubble */}
                    {msg.text && (
                      <div 
                        className={`text-[14px] leading-tight px-3 py-2 rounded-2xl relative shadow-[0_1px_0.5px_rgba(0,0,0,0.06)] ${
                          isMe 
                            ? // Outgoing styles
                              template === 'imessage' 
                                ? 'bg-[#007aff] text-white rounded-br-[4px]' 
                                : template === 'whatsapp'
                                  ? (isDark ? 'bg-[#005c4b] text-zinc-100 rounded-tr-none' : 'bg-[#d9fdd3] text-zinc-800 rounded-tr-none')
                                  : template === 'instagram'
                                    ? 'bg-gradient-to-tr from-[#3797f0] to-[#c13584] text-white'
                                    : 'bg-[#0084ff] text-white' // Messenger
                            : // Incoming styles
                              template === 'imessage'
                                ? (isDark ? 'bg-[#262628] text-white rounded-bl-[4px]' : 'bg-[#e9e9eb] text-black rounded-bl-[4px]')
                                : template === 'whatsapp'
                                  ? (isDark ? 'bg-[#202c33] text-zinc-100 rounded-tl-none' : 'bg-white text-zinc-800 rounded-tl-none')
                                  : template === 'instagram'
                                    ? (isDark ? 'bg-[#262626] text-white' : 'bg-[#efefef] text-black')
                                    : (isDark ? 'bg-[#2f2f2f] text-white' : 'bg-[#f1f0f0] text-black') // Messenger
                        }`}
                        style={{
                          borderRadius: template === 'imessage' 
                            ? (isMe 
                              ? (isNextSame ? '18px 18px 4px 18px' : '18px 18px 4px 18px') 
                              : (isNextSame ? '18px 18px 18px 4px' : '18px 18px 18px 4px'))
                            : undefined
                        }}
                      >
                        {/* Text */}
                        <div className="break-words select-text">{msg.text}</div>

                        {/* WhatsApp inline timestamp & ticking */}
                        {template === 'whatsapp' && (
                          <div className="flex justify-end items-center gap-1 mt-1 text-[9px] opacity-60 leading-none text-right">
                            <span>{msg.time || phoneSettings.time}</span>
                            {isMe && (
                              <span className="ml-[1px]">
                                {msg.status === 'read' ? (
                                  <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                                ) : msg.status === 'delivered' ? (
                                  <CheckCheck className="w-3 h-3" />
                                ) : (
                                  <Check className="w-3 h-3" />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Delivery Status below iMessage/Messenger/Instagram (if not WhatsApp) */}
                    {template !== 'whatsapp' && msg.time && (
                      <div className={`text-[10px] mt-0.5 ${isMe ? 'text-right' : 'text-left'} text-zinc-400 px-1`}>
                        {msg.time}
                      </div>
                    )}

                    {/* Little checkmark or text state for Messenger/iMessage on the very last right bubble */}
                    {template === 'imessage' && isMe && !isNextSame && msg.status && msg.status !== 'none' && (
                      <div className="text-[10px] text-right text-zinc-400 mt-0.5 tracking-tight font-medium select-none capitalize">
                        {msg.status}
                      </div>
                    )}

                    {template === 'messenger' && isMe && !isNextSame && msg.status && msg.status !== 'none' && (
                      <div className="text-[9px] text-zinc-400 text-right mt-0.5 select-none font-medium flex justify-end">
                        {msg.status === 'read' ? (
                          <div className="scale-65">{renderAvatar("w-3.5 h-3.5 text-[6px]")}</div>
                        ) : msg.status === 'delivered' ? (
                          <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center">
                            <Check className="w-2 h-2 text-white stroke-[2]" />
                          </div>
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-zinc-300 dark:border-zinc-700" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Optional typing indicator display if statusText says "typing..." */}
            {contactSettings.statusText?.toLowerCase() === 'typing...' && (
              <div className="flex items-end gap-1.5 mt-1">
                {template === 'messenger' && <div className="scale-60 -ml-1">{renderAvatar("w-7 h-7 text-xs")}</div>}
                <div className={`px-4 py-3 rounded-2xl max-w-[20%] flex items-center justify-center gap-1 ${
                  isDark ? 'bg-zinc-800' : 'bg-zinc-100'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* 4. CHAT INPUT BAR BAR */}
          {phoneSettings.showInputBar && (
            <div className={`p-2 pb-5 z-20 border-t ${
              isDark ? 'bg-[#121212] border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              
              {/* A. iMESSAGE INPUT */}
              {template === 'imessage' && (
                <div className="flex items-center gap-1 w-full px-1">
                  <Camera className="w-6 h-6 text-zinc-400 cursor-pointer" />
                  <Inbox className="w-6 h-6 text-zinc-400 cursor-pointer" />
                  <div className={`flex-1 flex items-center border rounded-full px-2.5 py-1.5 min-h-[34px] ${
                    isDark ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'
                  }`}>
                    <span className="text-zinc-400 text-xs flex-1">iMessage</span>
                    <div className="p-0.5 rounded-full bg-[#007aff] mr-0.5 shadow-sm">
                      <Send className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              )}

              {/* B. WHATSAPP INPUT */}
              {template === 'whatsapp' && (
                <div className="flex items-center gap-1.5 w-full">
                  <div className={`flex-1 flex items-center rounded-full px-3 py-1.5 gap-2 shadow-sm ${
                    isDark ? 'bg-[#202c33] text-white' : 'bg-white text-zinc-700'
                  }`}>
                    <Smile className="w-5 h-5 text-zinc-400 cursor-pointer" />
                    <Paperclip className="w-5 h-5 text-zinc-400 cursor-pointer rotate-45" />
                    <span className="text-sm text-zinc-400 flex-1">Message</span>
                    <Camera className="w-5 h-5 text-zinc-400 cursor-pointer" />
                  </div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-md text-white ${
                    isDark ? 'bg-[#005c4b]' : 'bg-[#00a884]'
                  }`}>
                    <Mic className="w-[18px] h-[18px]" />
                  </div>
                </div>
              )}

              {/* C. INSTAGRAM DM INPUT */}
              {template === 'instagram' && (
                <div className={`flex items-center rounded-full border px-3 py-1.5 gap-2 w-full ${
                  isDark ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'
                }`}>
                  <div className="p-1 rounded-full bg-[#3797f0] text-white">
                    <Camera className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-[13px] text-zinc-400 flex-1">Message...</span>
                  <Mic className="w-[18px] h-[18px] text-zinc-400 cursor-pointer" />
                  <ImageIcon className="w-[18px] h-[18px] text-zinc-400 cursor-pointer" />
                  <Heart className="w-[18px] h-[18px] text-zinc-400 cursor-pointer" />
                </div>
              )}

              {/* D. MESSENGER INPUT */}
              {template === 'messenger' && (
                <div className="flex items-center gap-2.5 w-full px-1">
                  <div className="flex items-center gap-2 text-[#0084ff]">
                    <MoreHorizontal className="w-[20px] h-[20px] cursor-pointer" />
                    <Camera className="w-[20px] h-[20px] cursor-pointer" />
                    <ImageIcon className="w-[20px] h-[20px] cursor-pointer" />
                    <Mic className="w-[20px] h-[20px] cursor-pointer" />
                  </div>
                  <div className={`flex-1 flex items-center rounded-full px-3 py-1.5 ${
                    isDark ? 'bg-zinc-800/80' : 'bg-zinc-100'
                  }`}>
                    <span className="text-[13px] text-zinc-400 flex-1">Aa</span>
                    <Smile className="w-[18px] h-[18px] text-[#0084ff]" />
                  </div>
                  <Smile className="w-[20px] h-[20px] text-[#0084ff] fill-current" />
                </div>
              )}

            </div>
          )}

          {/* Mini Watermark optional layer (clean and professional) */}
          {watermark && (
            <div className="absolute bottom-1 left-0 right-0 text-[8px] text-center text-zinc-400/40 select-none z-30 font-mono">
              generated with FakeChat
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

PhonePreview.displayName = 'PhonePreview';
export default PhonePreview;
