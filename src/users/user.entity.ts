import { FileEntity } from "src/file/file.entity";
import { Role } from "src/roles/role.enum";

export class User {

    userId: number;
    nickname: string;
    full_name: string;
    email: string;
    roles: Role[];
    password?: string;
    picture?: FileEntity;
}