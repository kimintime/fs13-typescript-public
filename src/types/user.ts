import { Entity } from "./common";

export interface User extends Entity{
    name: string
    email: string
    password: string
    role: "customer" | "admin"
    avatar: string
}
