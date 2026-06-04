import { emailConfig } from "../config/config";
import { renderPasswordResetEmail, renderPasswordResetEmailText } from "../templates/password-reset-email";
import { renderVerificationEmail, renderVerificationEmailText } from "../templates/verification-email";
import { PasswordResetEmailData, VerificationEmailData } from "../types/email.types";
import { EmailService } from "./email-service";

export class AuthEmailService {
    static async sendVerificationEmail(data: VerificationEmailData): Promise<void> {
        await EmailService.send({
            from: emailConfig.from.verification,
            to: data.email,
            subject: 'Confirma tu cuenta',
            text: renderVerificationEmailText(data),
            html: renderVerificationEmail(data)
        })
    }

    static async sendPasswordResetToken(data: PasswordResetEmailData): Promise<void> { 
        await EmailService.send({
            from: emailConfig.from.passwordReset,
            to: data.email,
            subject: 'Solicitud para cambiar la contraseña',
            html: renderPasswordResetEmail(data),
            text: renderPasswordResetEmailText(data)
        })
    }
}