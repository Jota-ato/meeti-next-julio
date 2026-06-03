import { auth } from "@/lib/auth";
import { SignUpType } from "../schemas/authSchema";

class AuthService {
    async register(credentials: SignUpType) {
        const { name, email, password, passwordConfirmation } = credentials

        // Revisar si el usuario existe

        // Validación de negocio

        // Manejar el registro
        const data = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });

        return {
            message: 'Cuenta creada correctamente, revisa tu e-mail',
            success: true,
        }
    }
}

export const authService = new AuthService()