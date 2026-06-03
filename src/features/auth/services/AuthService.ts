import { SignUpType } from "../schemas/authSchema";

class AuthService {
    async register(credentials: SignUpType) {
        const { name, email, password, passwordConfirmation } = credentials

        // Revisar si el usuario existe

        // Validación de negocio

        // Manejar el registro
    }
}

export const authService = new AuthService()