export interface SignUpDTO {
  password: string;
  id: string;
  fullname: string;
}

export interface SignInDTO {
  password: string;
  id: string;
}

export interface AuthTokenDecoded {
  id: string;
  iat: number;
  exp: number;
}

export type FriendshipStatus =
  | 'ActiveUserSubscribed'
  | 'TargetUserSubscribed'
  | 'Friends'
  | 'Strangers';

export type FriendRequestStatus = 'ACCEPTED' | 'DECLINED' | 'WAITING';

export interface FriendRequestData {
  status: FriendRequestStatus;
  receiverId: string;
  creatorId: string;
  creator: UserData;
}

export interface UserData {
  fullname: string;
  id: string;
  friendStatus?: FriendshipStatus;
}
