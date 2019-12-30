export class Buisness {
    public Id: string;
    public Name: string;
    public OwnerId: string;
    public Email: string;
    public Location: {
        Street: string,
        ZIP: string,
        Country: string,
        City: string
    }
    public Members: {
        Id: string,
        RoleId: string,
        Username?: string
    }[];
    public Offers: string[];
    public Logs: Log[];
    public Reviews: string[];
    public Verified: boolean;
}

export class Log {
    public Emitter: string;
    public Action: {
        Receiver: string,
        Name: string,
        Punish: boolean
    };
    public Date: string;
    public EmitterName?: string;
}

export class Role {
    public Id: string;
    public Position: number;
    public Permissions: Permission[];
}

export class Permission {
    public Id: string;
    public Name: string;
    public Allowed: string[];
    public Denied: string[];
}