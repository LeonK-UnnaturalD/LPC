import User from './User';

export class Buyer {
    public Name: string;
    public OfferId: string;
    public Price: number;
    public PaymentMethod: string;
    public Description?: string = "";
}

export class Offer {
    public Username: string;
    public Price: number;
    public PaymentMethod: string;
    public User: User;
    public Location: string;
    public Id: string;
}