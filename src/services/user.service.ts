import * as argon2 from "argon2";
import User, { UserInterface as UserType } from "../models/User";

export class UserService {
    static find(): Promise<UserType | null> {
        return User.findAll();
    }

    static create(user): Promise<UserType> {
        // Hash the password
        const hashedPassword = argon2.hash(user.password);
        user.password = hashedPassword;
        user.save();
        return user;
    }

    static findById(id: string): Promise<UserType | null> {
        return User.findById(id);
    }

    static findByEmail(email: string): Promise<UserType | null> {
        return User.findOne({ email });
    }

    static update(user: UserType, updates: object): Promise<UserType> {
        Object.assign(user, updates);
        user.save();
        return user;
    }

    static delete(user: UserType): Promise<any> {
        return user.remove();
    }
}
