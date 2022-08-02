export interface IUser {
  _id: string;
  profilePicture?: string;
  coverPicture?: string;
  username?: string;
  desc?: string;
  city?: string;
  from?: string;
  relationship?: 1 | 2 | 3;
  following?: IUser[];
  followers?: IUser[];
  token: string;
}

export interface IPost {
  _id?: string;
  desc?: string;
  img?: string;
  updatedAt?: string;
  createdAt?: string;
  userId?: string;
  likes?: string[];
  // comment?: number;
}

export interface IConversation {
  _id: string;
  members: IUser[];
}

export interface IMessage {
  _id: string;
  conversationId: string;
  text: string;
  sender: IUser;
  createdAt: string;
}

export interface IOnlineUser {
  userId: string;
  socketId: string;
}

export interface ServerToClientEvents {
  getUsers: (users: IOnlineUser[]) => void;
  getMessage: () => void;
}

export interface ClientToServerEvents {
  addUser: (userId: string) => void;
  sendMessage: (receiverId: string) => void;
}

