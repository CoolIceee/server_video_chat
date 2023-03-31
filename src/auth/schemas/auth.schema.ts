import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AuthDocument = Auth & Document;
@Schema()
export class Auth {
  @Prop()
  name: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: false })
  isActiveted: boolean;
  @Prop()
  activetedLink: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
