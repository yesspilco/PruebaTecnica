import * as nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/smtp-connection";
import hbs from "nodemailer-express-handlebars";
import {
  HOST_EMAIL,
  PASS_EMAIL,
  PORT_EMAIL,
  USER_EMAIL,
  EMISOR_EMAIL,
} from "../constants/enviroment";

export default class EmailHelper {
  private nodemailer: nodemailer.Transporter;
  private nodemailerConfig: Options;

  constructor() {
    this.nodemailerConfig = {
      host: HOST_EMAIL,
      port: Number(PORT_EMAIL),
      secure: true,
      auth: {
        user: USER_EMAIL,
        pass: PASS_EMAIL,
      },
    };

    this.nodemailer = nodemailer.createTransport(this.nodemailerConfig);
    this.nodemailer.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          defaultLayout: "main",
          layoutsDir: "views/layouts",
          partialsDir: "views/partials",
        },
        extName: ".hbs",
        viewPath: "views",
      })
    );
  }

  sendEmailTemplate(
    titulo: string,
    attachments: any,
    templateName: string,
    contexts: any
  ) {
    return new Promise((resolve, reject) => {
      const mailOpciones: any = {
        from: EMISOR_EMAIL,
        to: contexts.email,
        subject: titulo,
        attachments,
        template: templateName,
        context: contexts,
      };
      this.nodemailer.sendMail(mailOpciones, (error) => {
        if (error) reject(error.message);
        resolve(true);
      });
    });
  }

  loginUser = (fullName: string, code: number, email: string) => {
    const result = this.sendEmailTemplate(
      "Iniciar Sesión",
      null,
      "user_login",
      {
        fullName,
        code,
        email,
      }
    )
      .then(async () => {
        return "Exito";
      })
      .catch(async (err) => {
        return err;
      });
    return result;
  };

  recoverUsername = (fullName: string, username: string, email: string) => {
    const result = this.sendEmailTemplate(
      "Recuperar Usuario",
      null,
      "recover_username",
      {
        fullName,
        username,
        email,
      }
    )
      .then(async () => {
        return "Exito";
      })
      .catch(async (err) => {
        return err;
      });
    return result;
  };

  recoverPassword = (fullName: string, code: number, email: string) => {
    const result = this.sendEmailTemplate(
      "Recuperar Contraseña",
      null,
      "recover_password",
      {
        fullName,
        code,
        email,
      }
    )
      .then(async () => {
        return "Exito";
      })
      .catch(async (err) => {
        return err;
      });
    return result;
  };

  reviewRecharg = (fullName: string, code: string, remark: string, email: string, status: number) => {
    const result = this.sendEmailTemplate(
      "Revisión recarga",
      null,
      "review_recharg",
      {
        fullName,
        code,
        remark,
        email,
        status: status == 1 ? 'Aprobada' : 'Rechazado'
      }
    )
      .then(async () => {
        return "Exito";
      })
      .catch(async (err) => {
        return err;
      });
    return result;
  };

  reviewRetreat = (fullName: string, code: string, remark: string, email: string, status: number, photo: string, amount: number) => {
    const result = this.sendEmailTemplate(
      "Revisión retiro",
      null,
      "review_retreat",
      {
        fullName,
        code,
        remark,
        email,
        status: status == 1 ? 'Aprobada' : 'Rechazado',
        photo,
        amount
      }
    )
      .then(async () => {
        return "Exito";
      })
      .catch(async (err) => {
        return err;
      });
    return result;
  };
}

