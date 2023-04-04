import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Auth } from './auth.schema';
export type TokenDocument = Token & Document;
@Schema()
export class Token {
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' } })
  user: Auth;
  @Prop({ unique: true, required: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
