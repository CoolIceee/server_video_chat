import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AuthDocument = Auth & Document;
@Schema()
export class Auth {
  @Prop()
  name: string;
  @Prop()
  phone: string;
  @Prop()
  phoneOtp: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
