import User from './User';

export default class AuthResponse {
    public User: { Id: string, Username: string }
    public Token: string;
}