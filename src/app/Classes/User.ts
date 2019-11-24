import Comment from './Comment';

export default class User {
    public Username: string;
    public Email?: string;
    public Id: string;
    public Description: string;
    public Comments: Array<Comment>;
    public CreatedAt: string;
    public Languages: Array<string>;
    public ConfirmedTrades: Array<string>;
    public FeedbackScore: number;
    public Trust: Array<string>;
    public SellOffers: Array<string>;
    public Terms: string;
}