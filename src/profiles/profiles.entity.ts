import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop()
  displayName: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: Date;

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

export const ProfileSchema = SchemaFactory.createForClass(Profile);
