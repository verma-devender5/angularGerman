import {IUser} from "./IUser";

export interface IToken extends IUser {
    token: string,
    refreshToken: string
}
