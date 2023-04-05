import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
class MailService {
  constructor(
    // помимо всего прочего подключение сервиса отправки
    private readonly mailerService?: MailerService,
  ) {}
  async sendConfirmMail(to, link) {
    // const urlConfirmAddress = this.configService.get<string>(
    //   'URL_CONFIRM_ADDRESS',
    // );
    // Отправка почты
    return await this.mailerService
      .sendMail({
        to,
        subject: 'Подтверждение регистрации',
        // template: join(__dirname, '/../templates', 'confirmReg'),
        context: {
          id: to,
          username: to,
        },
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
export default new MailService();
