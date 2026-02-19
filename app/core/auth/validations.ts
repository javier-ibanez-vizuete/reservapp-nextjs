import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z
        .string()
        .min(5, "El Email debe tener al menos 5 Carácteres."),
    password: z
        .string()
        .min(8, "La Contraseña debe tener al menos 8 Carácteres.")
        .max(50, "La Contraseña debe tener un máximo de 50 Carácteres.")
});

export const RegisterFormSchema = z.object({
    name: z
        .string()
        .min(4, "El Nombre debe tener al menos 4 Carácteres.")
        .max(30, "El nombre debe tener un máximo de 30 Carácteres."),
    email: z
        .email("Por favor Introduzca un Email Valido.")
        .min(5, "El Email debe tener al menos 5 Carácteres.")
        .max(50, "La Contraseña debe tener un máximo de 50 Carácteres."),
    address: z
        .string()
        .min(8, "La direccion debe tener al menos 8 Carácteres.")
        .max(50, "La direccion debe tener un máximo de 50 Carácteres."),
    phoneNumber: z
        .string()
        .min(9, "El Número debe tener al menos 9 caracteres")
        .max(20, "El Número debe tener un máximo de 20 caracteres")
        .regex(/^[0-9]+$/, "El teléfono solo puede contener números"),
    password: z
        .string()
        .min(8, "La Contraseña debe tener al menos 8 Carácteres.")
        .max(50, "La Contraseña debe tener un máximo de 50 Carácteres."),
    password2: z
        .string(),
    avatarUrl: z
        .string("Direccion Url no Valida."),
    avatarAlt: z
        .string("Alt Introducido no valido."),
    avatarWidth: z
        .string("El Ancho de imagen debe de ser un número."),
    avatarHeight: z
        .string("El alto de imagen debe de ser un número.")
})
    .refine((data) => data.password === data.password2, {
        error: "Las Contraseñas Deben Coincidir",
        path: ["password2"]
    })
