import { Role } from "src/roles/role.enum";

export class User {

    userId: number;
    nickname: string;
    full_name: string;
    email: string;
    role: Role[];

}