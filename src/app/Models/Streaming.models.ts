export interface User{
  userId?: number;
  userName: string;
  email: string;
  passwordHash?: string; // optional on frontend
  role: string;
  subscriptionPlanId?: number;
  subscriptionPlan? : SubscriptionPlan;
  playlists? : Playlist[];
}


export interface Login {
  username: string;
  password: string;
}


export interface Media {
  mediaId: number;
  title: string;
  mediaType: string;
  url: string;
  durationInMinutes : number;
  genre: string;
  releaseDate : Date;
  playListMedias : Playlist[];
}


export interface PlaylistMedia {
  playlistId: number;
  mediaId: number;
  media: Media;
}

export interface Playlist {
  playlistId: number;
  name: string;
  userId: number;
  playlistMedias: PlaylistMedia[];
  user: User;
}


export interface SubscriptionPlan {
  subscriptionPlanId: number;
  planName: string;
  price: number;
  maxDevices : number;
  isDownloadAllowed: boolean;
  users : User[];
}
