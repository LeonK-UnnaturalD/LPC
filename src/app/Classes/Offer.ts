export default class Offer {
    public Username: string;
    public Price: number;
    public Deposit: string;
    public Id: string;
    public Limit: number;
    public UserId: string;
    public Type: { Sell: boolean, Buy: boolean }
    public Currency: string;
    public City: string;
    public Country: string;
    public Terms?: string;
}