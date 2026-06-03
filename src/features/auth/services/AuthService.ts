import { auth } from "@/lib/auth";
import { SignUpType } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";

class AuthService {

    constructor(
        private authRepository: IAuthRepository
    ) { }

    async register(credentials: SignUpType) {
        const { name, email, password } = credentials

        // Revisar si el usuario existe
        const userExists = await this.authRepository.userExists(email)
        if (userExists) { 
            return {
                success: false,
                message: 'Este email ya está registrado, prueba otro. O inicia sesión'
            }
        }

        // Validación de negocio

        // Manejar el registro
        await auth.api.signUpEmail({
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

export const authService = new AuthService(authRepository)