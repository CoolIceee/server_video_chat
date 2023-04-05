import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AuthDocument = Auth & Document;
@Schema()
export class Auth {
  @Prop()
  name: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ default: false })
  isActiveted: boolean;
  @Prop()
  activetedLink: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
