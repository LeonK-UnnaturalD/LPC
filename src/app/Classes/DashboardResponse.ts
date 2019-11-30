import User from './User';
import Offer from './Offer';
import Comment from './Comment';

export default class DashboardResult {
    public User: User;
    public Offers: Array<Offer>;
    public Reviews: Array<Comment>;
}