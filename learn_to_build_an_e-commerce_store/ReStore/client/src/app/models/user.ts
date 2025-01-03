import { Basket } from "./basket";

export interface User {
    email: string;
    token: string;
    basket?: Basket;
}
export interface RegisterType {
    username: string;
    email: string;
    password: string;
}

