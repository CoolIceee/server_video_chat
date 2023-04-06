import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { getMailConfig } from 'src/configs/mail.config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: '465',
        auth: {
          user: 'fayamiyagi1@gmail.com',
          pass: 'hsgemivzcnqxqush',
        },
      },
    }),
  ],
})
export class MailModule {}
