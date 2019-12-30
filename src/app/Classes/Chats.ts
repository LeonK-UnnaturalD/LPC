import Message from './Messages';

export default class Chat {
    public Messages: Array<Message>;
    public Id: string;
    public Username: string;
    public CustomerId: string;
    public OffererId: string;
    public UserId: string;
    public Blocked: boolean;
    public BlockedBy: string;
    public IsAvailable?: boolean = false;
}