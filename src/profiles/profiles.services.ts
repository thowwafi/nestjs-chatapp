// src/profiles/profiles.service.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async getProfile(userId: string): Promise<Profile | null> {
    return await this.profileModel.findOne({ _id: userId }).exec();
  }

  async updateAbout(userId: string, aboutData: Partial<Profile>): Promise<void> {
    await this.profileModel.findOneAndUpdate({ userId }, aboutData).exec();
  }

  async updateInterests(userId: string, interests: string[]): Promise<void> {
    await this.profileModel.findOneAndUpdate({ userId }, { interests }).exec();
  }
}
