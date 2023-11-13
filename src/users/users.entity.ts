// users.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile, ProfileSchema } from '../profiles/profiles.entity';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  userId: string;

  @Prop()
  displayName: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop({ type: Number })
  heightValue: number;

  @Prop({ enum: ['cm', 'inches'] })
  heightUnit: string;

  @Prop({ type: Number })
  weightValue: number;

  @Prop({ enum: ['kg', 'pounds'] })
  weightUnit: string;

  @Prop({ type: [String] })
  interests: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
