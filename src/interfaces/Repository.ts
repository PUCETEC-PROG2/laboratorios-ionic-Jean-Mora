export interface Repository {
    avatarurl: string | undefined;
    id: number
    name: string;
    description: string;
    language: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}
