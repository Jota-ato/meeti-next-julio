import { emailConfig } from "../config/config";
import { renderVerificationEmail, renderVerificationEmailText } from "../templates/verification-email";
import { VerificationEmailData } from "../types/email.types";
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
}