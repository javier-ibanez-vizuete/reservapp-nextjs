"use server"

import { cookies } from "next/headers";
import { z } from "zod";
import { registerApi } from "./auth.api";
import { RegisterFormState, UserRole } from "./auth.type";
import { RegisterFormSchema } from "./validations";

const DOMINIO_VERCEL = "reservapp-nextjs.vercel.app"

const cookieConfig = {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    domain: process.env.HOST ?? "localhost",
    secure: process.env.NODE_ENV === "production",
}



export async function registerUserAction(prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> {

    const fields = {
        name: formData.get("name"),
        email: formData.get("email"),
        address: formData.get("address"),
        phoneNumber: formData.get("phoneNumber"),
        password: formData.get("password"),
        password2: formData.get("password2"),
        avatarUrl: formData.get("avatarUrl"),
        avatarAlt: formData.get("avatarAlt"),
        avatarWidth: formData.get("avatarWidth"),
        avatarHeight: formData.get("avatarHeight"),
    }

    const validatedFields = RegisterFormSchema.safeParse(fields);

    if (!validatedFields.success) {
        console.log("Error En Campos de Formulario")
        console.log(validatedFields)

        const flattenedErrors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: "Error de Validacion",
            errors: flattenedErrors.fieldErrors,
            serverError: undefined,
            data: fields
        }
    }
    console.log("Datos en Servidor Validados con Exito")
    const datafields = validatedFields.data;
    const userData = {
        role: UserRole.USER,
        name: datafields.name,
        email: datafields.email,
        address: datafields.address,
        phoneNumber: datafields.phoneNumber,
        password: datafields.password,
        avatar: {
            url: datafields.avatarUrl,
            alt: datafields.avatarAlt,
            width: Number(datafields.avatarWidth),
            height: Number(datafields.avatarHeight)
        }
    }

    const apiResponse = await registerApi(userData);

    if (!apiResponse) {
        return {
            success: false,
            message: "Registro fallido desde la api",
            errors: null,
            serverError: (apiResponse as { error: string })?.error,
            data: fields
        }
    }

    const cookieStore = await cookies();
    cookieStore.set("token", apiResponse.token, cookieConfig)
    return {
        success: true,
        message: "Usuario Registrado con Exito",
        serverError: undefined,
        errors: null,
        data: validatedFields.data,
        user: apiResponse.user
    }

}