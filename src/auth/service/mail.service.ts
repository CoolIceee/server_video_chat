import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmMail() {
    return await this.mailerService
      .sendMail({
        to: 'magahak1414@gmail.com',
        from: 'fayamiyagi1@gmail.com',
        subject: 'Подтверждение регистрации',
        text: 'dadadadd',
        html: `<div>aadad</div>`,
      })
      .catch((e) => {
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }
  ///
}

// import * as nodemailer from 'nodemailer';

// class MailService {
//   transporter: any;
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gamail',
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: true,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: `${process.env.SMTP_PASSWORD}`,
//       },
//     });
//   }
//   async sendActivatioMail(to, link) {
//     this.transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to,
//       text: '',
//       html: `
//     <div>
//     <div>
//     <a href="${link}">${link}</a>
//     </div>
//     </div>
//     `,
//     });
//   }
// }
