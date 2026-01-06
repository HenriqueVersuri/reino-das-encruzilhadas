
export enum View {
  HOME = 'HOME',
  ORACLE = 'ORACLE',
  ENTITIES = 'ENTITIES',
  KNOWLEDGE = 'KNOWLEDGE',
  ADMIN = 'ADMIN',
  MEMBERS = 'MEMBERS',
  AUTH = 'AUTH',
  CALENDAR = 'CALENDAR'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Entity {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'Exu' | 'Pombagira' | 'Malandro';
}

export interface MemberEntity {
  id: string;
  name: string;
  type: string;
  history: string;
  preferences: {
    drink: string;
    smoke: string;
    clothes: string;
    colors: string;
  };
}

export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface InternalMessage {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Donation {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  purpose: string;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  month: string;
  status: 'pago' | 'pendente';
  date?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: 'Velas' | 'Ervas' | 'Bebidas' | 'Outros';
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isMember: boolean;
  profile?: {
    fullName: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;
    whatsapp: string;
    allergies: string;
    observations: string;
    entities: MemberEntity[];
    diary: DiaryEntry[];
    messages: InternalMessage[];
  };
}

export interface SpiritualEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'Ritual' | 'Gira' | 'Consulta';
}

export interface Announcement {
  id: string;
  text: string;
  priority: 'low' | 'high';
  active: boolean;
}
