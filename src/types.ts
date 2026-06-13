export type TemplateType = 'imessage' | 'whatsapp' | 'instagram' | 'messenger';

export type ThemeMode = 'light' | 'dark';

export type MessageStatus = 'none' | 'sent' | 'delivered' | 'read';

export type MessageType = 'text' | 'image' | 'system';

export interface Message {
  id: string;
  sender: 'me' | 'them'; // 'me' is right (blue/green/gradient), 'them' is left (grey/white)
  type: MessageType;
  text: string;
  imageUrl?: string;
  time?: string; // Optional message-level delivery or timestamp info
  status?: MessageStatus;
}

export interface PhoneSettings {
  carrier: string;
  signalStrength: number; // 1 to 4
  wifiStrength: number; // 0 to 3
  networkType: 'LTE' | '5G' | 'WiFi' | '4G';
  time: string;
  batteryLevel: number; // 0 to 100
  batteryCharging: boolean;
  showStatusBar: boolean;
  showInputBar: boolean;
  theme: ThemeMode;
}

export interface ContactSettings {
  name: string;
  statusText: string; // "online", "typing...", "active 5m ago"
  avatarUrl: string; // custom image src
  avatarColor: string; // fallback colored background hex
  showAvatar: boolean;
}

export interface ChatPreset {
  name: string;
  description: string;
  template: TemplateType;
  theme: ThemeMode;
  contact: ContactSettings;
  phone: PhoneSettings;
  messages: Message[];
}
