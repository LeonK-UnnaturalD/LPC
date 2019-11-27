export default class Message {
    constructor(public Owner: string, public Username: string, public Content: string, public Date: string, public IsEmbed: boolean = false) {

    }
}