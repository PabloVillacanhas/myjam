export interface Song {
	songName: string;
	songTime: string;
	lyric: string;
	artist: string;
}

export interface Session {
	objectId: string;
	code: string;
	songs?: Array<Song>;
	createdAt: string
	updatedAt: string
}
