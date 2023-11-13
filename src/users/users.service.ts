import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel } from './users.entity';
import * as bcrypt from 'bcryptjs';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {}
    
    async findOne(username: string): Promise<UserModel | undefined> {
        return this.userModel.findOne({ username }).exec();
    }

    async getUser(userId: string): Promise<UserModel | undefined> {
        return this.userModel.findOne({ _id: userId }).exec();
    }

    async updateAbout(userId: string, aboutData: Partial<User>): Promise<void> {
        console.log("user_id", userId)
        await this.userModel.findOneAndUpdate({ _id: userId }, aboutData).exec();
    }

    async createUser(username: string, password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
        const newUser = new this.userModel({ username, password: hashedPassword });
        const savedUser = await newUser.save();
        // Return the user ID
        return savedUser._id.toString();

    }
}