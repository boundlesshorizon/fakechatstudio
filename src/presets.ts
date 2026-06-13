import { ChatPreset } from './types';

export const CHAT_PRESETS: ChatPreset[] = [
  {
    name: "FB Marketplace Clown (Messenger)",
    description: "The peak customer interaction experience representing online barterers.",
    template: "messenger",
    theme: "light",
    contact: {
      name: "Tanner (Marketplace)",
      statusText: "Active 2m ago",
      avatarUrl: "",
      avatarColor: "#3b82f6",
      showAvatar: true
    },
    phone: {
      carrier: "Verizon",
      signalStrength: 4,
      wifiStrength: 3,
      networkType: "WiFi",
      time: "4:12 PM",
      batteryLevel: 88,
      batteryCharging: false,
      showStatusBar: true,
      showInputBar: true,
      theme: "light"
    },
    messages: [
      {
        id: "fb1",
        sender: "them",
        type: "text",
        text: "Hi, is this graphics card still available for $400?"
      },
      {
        id: "fb2",
        sender: "me",
        type: "text",
        text: "Yes, it is! Perfect condition. Are you looking to pick it up today?"
      },
      {
        id: "fb3",
        sender: "them",
        type: "text",
        text: "would you swap for a vintage 2008 xbox 360 with no power cord and a slightly chewed controller? I can also throw in half a tub of strawberry preworkout"
      },
      {
        id: "fb4",
        sender: "me",
        type: "text",
        text: "No thank you... I am only looking for cash."
      },
      {
        id: "fb5",
        sender: "them",
        type: "text",
        text: "it is literally a collector's item bro. you are missing out. my loss is your gain. i can throw in a used sleeping bag too"
      },
      {
        id: "fb6",
        sender: "me",
        type: "text",
        text: "Please stop texting me, Tanner."
      },
      {
        id: "fb7",
        sender: "them",
        type: "text",
        text: "you just ruined my kid's entire summer birthday. hope you are happy."
      }
    ]
  },
  {
    name: "Delusional Landlord (iMessage)",
    description: "The classic security deposit deduction warning text.",
    template: "imessage",
    theme: "light",
    contact: {
      name: "Jerry (Landlord)",
      statusText: "online",
      avatarUrl: "",
      avatarColor: "#ea580c",
      showAvatar: true
    },
    phone: {
      carrier: "AT&T",
      signalStrength: 3,
      wifiStrength: 3,
      networkType: "LTE",
      time: "8:05 AM",
      batteryLevel: 95,
      batteryCharging: true,
      showStatusBar: true,
      showInputBar: true,
      theme: "light"
    },
    messages: [
      {
        id: "ll1",
        sender: "them",
        type: "system",
        text: "Today 7:55 AM"
      },
      {
        id: "ll2",
        sender: "them",
        type: "text",
        text: "Hi there. I drove past the duplex this morning and saw a lawn chair on the deck. That violates Section 14 Subsection C of the lease (unapproved outdoor leisure equipment)."
      },
      {
        id: "ll3",
        sender: "me",
        type: "text",
        text: "Jerry, it is a single plastic folding chair. It is 80 degrees outside?"
      },
      {
        id: "ll4",
        sender: "them",
        type: "text",
        text: "I will have to issue a $150 deck compliance assessment fee. Also noticed your window blinds are open at a 45 degree angle instead of the building-mandated 90 degrees."
      },
      {
        id: "ll5",
        sender: "me",
        type: "text",
        text: "Are you serious right now? I am literally at work."
      },
      {
        id: "ll6",
        sender: "them",
        type: "text",
        text: "blinds fee is $50. enjoy your day"
      }
    ]
  },
  {
    name: "Crypto Overlord (WhatsApp)",
    description: "WhatsApp crypto bro checking in from Dubai.",
    template: "whatsapp",
    theme: "dark",
    contact: {
      name: "Chad (Crypto Guru)",
      statusText: "typing...",
      avatarUrl: "",
      avatarColor: "#059669",
      showAvatar: true
    },
    phone: {
      carrier: "Du",
      signalStrength: 3,
      wifiStrength: 3,
      networkType: "5G",
      time: "21:05",
      batteryLevel: 98,
      batteryCharging: true,
      showStatusBar: true,
      showInputBar: true,
      theme: "dark"
    },
    messages: [
      {
        id: "w1",
        sender: "them",
        type: "system",
        text: "Yesterday"
      },
      {
        id: "w2",
        sender: "them",
        type: "text",
        text: "Bro did you secure the presale allocation?? Code is active for 5 more mins. 🚀🚀",
        time: "20:31"
      },
      {
        id: "w3",
        sender: "me",
        type: "text",
        text: "I missed it. Is it completely over?",
        time: "20:33",
        status: "read"
      },
      {
        id: "w4",
        sender: "them",
        type: "system",
        text: "Today"
      },
      {
        id: "w5",
        sender: "them",
        type: "text",
        text: "Never let a bear market distract you. We loaded up. We are literally flying to Dubai tomorrow.",
        time: "15:45"
      },
      {
        id: "w6",
        sender: "me",
        type: "text",
        text: "Post a pic when you land!",
        time: "15:47",
        status: "read"
      },
      {
        id: "w7",
        sender: "them",
        type: "image",
        text: "Private Jet life, bro! See you on the moon ✈️📈",
        imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        time: "15:52"
      }
    ]
  },
  {
    name: "Crazy DoorDash Delivery (iMessage)",
    description: "The delivery went extremely wrong.",
    template: "imessage",
    theme: "light",
    contact: {
      name: "Dasher (Steve)",
      statusText: "online",
      avatarUrl: "",
      avatarColor: "#dc2626",
      showAvatar: true
    },
    phone: {
      carrier: "T-Mobile",
      signalStrength: 2,
      wifiStrength: 2,
      networkType: "LTE",
      time: "10:30 PM",
      batteryLevel: 42,
      batteryCharging: false,
      showStatusBar: true,
      showInputBar: true,
      theme: "light"
    },
    messages: [
      {
        id: "dd1",
        sender: "them",
        type: "system",
        text: "10:15 PM"
      },
      {
        id: "dd2",
        sender: "them",
        type: "text",
        text: "I have dropped your pizza on the roof"
      },
      {
        id: "dd3",
        sender: "me",
        type: "text",
        text: "Wait, WHAT? What do you mean on the roof? How does that even happen?"
      },
      {
        id: "dd4",
        sender: "them",
        type: "text",
        text: "a raccoon startled me as I walked up the driveway and I threw the pizza boxes upward. they are flat on your shingles. I am so sorry."
      },
      {
        id: "dd5",
        sender: "them",
        type: "image",
        text: "It is technically still boxed up and warm. Please do not report me I have 4 kids",
        imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=60",
        time: "10:19 PM"
      },
      {
        id: "dd6",
        sender: "me",
        type: "text",
        text: "How am I supposed to get a ladder at 10 PM for some pepperoni slices, Steve? 😂"
      }
    ]
  },
  {
    name: "Clown Sock Brand Collab (Instagram)",
    description: "The classic unsolicited copy-paste creator spam.",
    template: "instagram",
    theme: "dark",
    contact: {
      name: "eco_bamboo_threads",
      statusText: "Active now",
      avatarUrl: "",
      avatarColor: "#c026d3",
      showAvatar: true
    },
    phone: {
      carrier: "AT&T",
      signalStrength: 4,
      wifiStrength: 3,
      networkType: "5G",
      time: "2:14 PM",
      batteryLevel: 19,
      batteryCharging: false,
      showStatusBar: true,
      showInputBar: true,
      theme: "dark"
    },
    messages: [
      {
        id: "b1",
        sender: "them",
        type: "text",
        text: "Hey gorgeous! 😍 Love your grid. We want to send you 2 pairs of our organic, hand-spun, raw bamboo fibers athletic socks. You pay just $18.99 shipping."
      },
      {
        id: "b2",
        sender: "me",
        type: "text",
        text: "Hello. I am a page that posts pictures of historical concrete bridges. I don't think my audience is looking for athletic socks."
      },
      {
        id: "b3",
        sender: "them",
        type: "text",
        text: "No worries love! We can pitch it as 'engineered concrete arch support'. We will pay you 5% in shop credits for every 100 sales. Code: CONCRETE15"
      },
      {
        id: "b4",
        sender: "me",
        type: "text",
        text: "I am literally a bot that crawls Wikipedia. I don't have feet."
      }
    ]
  },
  {
    name: "The Late Employee (Messenger)",
    description: "FB Messenger chain with the boss.",
    template: "messenger",
    theme: "light",
    contact: {
      name: "Richard (CEO)",
      statusText: "Active 10m ago",
      avatarUrl: "",
      avatarColor: "#4f46e5",
      showAvatar: true
    },
    phone: {
      carrier: "T-Mobile",
      signalStrength: 2,
      wifiStrength: 2,
      networkType: "5G",
      time: "9:15 AM",
      batteryLevel: 45,
      batteryCharging: false,
      showStatusBar: true,
      showInputBar: true,
      theme: "light"
    },
    messages: [
      {
        id: "me1",
        sender: "them",
        type: "text",
        text: "Hey, the standup meeting started 15 minutes ago. Are you online?"
      },
      {
        id: "me2",
        sender: "me",
        type: "text",
        text: "Hi Richard! Yes I am so sorry, my operating system decided to do a critical system update right at 8:55 AM."
      },
      {
        id: "me3",
        sender: "me",
        type: "image",
        text: "It is literally at 31% right now, I'm typing this from my phone. I will join immediately when it boots!",
        imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        status: "delivered"
      },
      {
        id: "me4",
        sender: "them",
        type: "text",
        text: "That is the third time your PC updated this month, Sarah. We might need to upgrade your machine to a typewriter."
      }
    ]
  },
  {
    name: "The Haunted Guitar (iMessage)",
    description: "Selling a slightly haunted acoustic guitar on Craigslist.",
    template: "imessage",
    theme: "light",
    contact: {
      name: "Craigslist Buyer (Wayne)",
      statusText: "online",
      avatarUrl: "",
      avatarColor: "#84cc16",
      showAvatar: true
    },
    phone: {
      carrier: "US Cellular",
      signalStrength: 4,
      wifiStrength: 3,
      networkType: "LTE",
      time: "11:15 PM",
      batteryLevel: 72,
      batteryCharging: false,
      showStatusBar: true,
      showInputBar: true,
      theme: "light"
    },
    messages: [
      {
        id: "hg1",
        sender: "them",
        type: "text",
        text: "Hi, is the $50 guitar still available? Can we meet behind the old mall?"
      },
      {
        id: "hg2",
        sender: "me",
        type: "text",
        text: "Yes it is! But full disclosure: it plays G-major chords by itself at exactly 3:00 AM."
      },
      {
        id: "hg3",
        sender: "them",
        type: "text",
        text: "wait like... intentionally? Or is it a draft?"
      },
      {
        id: "hg4",
        sender: "me",
        type: "text",
        text: "I do not know, Wayne. I tried taking the strings off and it still played. That is why it is $50 instead of $300."
      },
      {
        id: "hg5",
        sender: "them",
        type: "text",
        text: "honestly as long as it has a nice case I will take it. Can you throw in a pick"
      },
      {
        id: "hg6",
        sender: "me",
        type: "text",
        text: "The guitar won't let picks near it. It burns them."
      }
    ]
  },
  {
    name: "Overprotective Mom (WhatsApp)",
    description: "Mom is absolutely certain the new air fryer is spying on the family.",
    template: "whatsapp",
    theme: "light",
    contact: {
      name: "Mom ❤️",
      statusText: "online",
      avatarUrl: "",
      avatarColor: "#ec4899",
      showAvatar: true
    },
    phone: {
      carrier: "Verizon",
      signalStrength: 3,
      wifiStrength: 2,
      networkType: "WiFi",
      time: "14:22",
      batteryLevel: 89,
      batteryCharging: false,
      showStatusBar: true,
      showInputBar: true,
      theme: "light"
    },
    messages: [
      {
        id: "om1",
        sender: "them",
        type: "text",
        text: "Sweetheart how do I turn off the camera on the potato machine",
        time: "14:15"
      },
      {
        id: "om2",
        sender: "me",
        type: "text",
        text: "Mom, you mean the air fryer? It does not have a camera. It is just heat and air.",
        time: "14:17",
        status: "read"
      },
      {
        id: "om3",
        sender: "them",
        type: "text",
        text: "Then why did it make a beep noise when I walked by in my bathrobe?? It is connected to the hacker mainframe. I am unplugging it.",
        time: "14:20"
      },
      {
        id: "om4",
        sender: "me",
        type: "text",
        text: "It was just a timer alert mom... Please leave it plugged in, I am cooking salmon.",
        time: "14:21",
        status: "read"
      },
      {
        id: "om5",
        sender: "them",
        type: "text",
        text: "Too late it is in the garage under a heavy blanket.",
        time: "14:22"
      }
    ]
  },
  {
    name: "The Cat Sitter Crisis (iMessage)",
    description: "The cat is missing, but some weird clues are present.",
    template: "imessage",
    theme: "dark",
    contact: {
      name: "Cody (Cat Sitter)",
      statusText: "typing...",
      avatarUrl: "",
      avatarColor: "#14b8a6",
      showAvatar: true
    },
    phone: {
      carrier: "T-Mobile",
      signalStrength: 4,
      wifiStrength: 4,
      networkType: "5G",
      time: "6:10 PM",
      batteryLevel: 61,
      batteryCharging: true,
      showStatusBar: true,
      showInputBar: true,
      theme: "dark"
    },
    messages: [
      {
        id: "cs1",
        sender: "them",
        type: "text",
        text: "I have some good news and some bad news about Mittens"
      },
      {
        id: "cs2",
        sender: "me",
        type: "text",
        text: "Oh no. Please tell me you didn't lose him again."
      },
      {
        id: "cs3",
        sender: "them",
        type: "text",
        text: "The bad news is I haven't seen him in 6 hours. The good news is I hear faint crunching noises coming from the locked laundry room vents."
      },
      {
        id: "cs4",
        sender: "them",
        type: "image",
        text: "I think he bypassed the security barricade Ibuilt for him.",
        imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=60",
        time: "6:08 PM"
      },
      {
        id: "cs5",
        sender: "me",
        type: "text",
        text: "Cody, that is a picture of a golden retriever puppy. I own a black tabby CAT. Whose house are you even at??"
      }
    ]
  }
];
