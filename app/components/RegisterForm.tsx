"use client";

import {
    Button,
    Card,
    CardActions,
    CardContent,
    InputBase,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useCallback, useState } from "react";

import { AvatarType, RegisterFormState } from "../core/auth/auth.type";
import { AVATAR_DATA } from "../data/avatarData";
import { actions } from "../lib/actions";
import { TriggerType } from "../types/index.type";
import { Dropdown } from "./Dropdown/Dropdown";
import DropdownItem from "./Dropdown/DropdownItem";
import DropdownMenu from "./Dropdown/DropdownMenu";
import { DropdownTrigger } from "./Dropdown/DropdownTrigger";
import { FormError } from "./FormError";

export const INITIAL_STATE: RegisterFormState = {
    success: false,
    message: undefined,
    serverError: undefined,
    errors: null,
    data: {
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        password: "",
        password2: "",
        avatarUrl: AVATAR_DATA[0].url,
        avatarAlt: AVATAR_DATA[0].alt,
        avatarWidth: AVATAR_DATA[0].width.toString(),
        avatarHeight: AVATAR_DATA[0].height.toString(),
    },
};

export function RegisterForm() {
    const [selectedImage, setSelectedImage] = useState(AVATAR_DATA[0]);
    const [formState, formAction] = useActionState(actions.auth.registerUserAction, INITIAL_STATE);

    const handleSelectAvatar = useCallback((avatar: AvatarType) => setSelectedImage(avatar), []);

    return (
        <form action={formAction}>
            <Card>
                <CardContent className="flex flex-col gap-2">
                    <Typography variant="h1">HEADER</Typography>
                    <Stack spacing={1}>
                        <TextField
                            name="name"
                            type="text"
                            label="Nombre"
                            defaultValue={formState.data?.name}
                            placeholder="Nombre Completo"
                            size="medium"
                        />
                        {formState.errors?.name && <FormError error={formState.errors.name} />}
                        <TextField
                            name="email"
                            type="email"
                            label="Email"
                            defaultValue={formState.data?.email}
                            placeholder="email@email.com"
                        />
                        {formState.errors?.email && <FormError error={formState.errors.email} />}
                        <TextField
                            name="address"
                            type="text"
                            label="Direción"
                            defaultValue={formState.data?.address}
                            placeholder="Direccion de la Cueva, 2"
                        />
                        {formState.errors?.address && <FormError error={formState.errors.address} />}
                        <TextField
                            name="phoneNumber"
                            type="text"
                            label="Telefono"
                            defaultValue={formState.data?.phoneNumber}
                            placeholder="654789321"
                        />
                        {formState.errors?.phoneNumber && <FormError error={formState.errors.phoneNumber} />}
                        <TextField
                            name="password"
                            type="password"
                            label="Contraseña"
                            defaultValue={formState.data?.password}
                            placeholder="Contraseña2"
                        />
                        {formState.errors?.password && <FormError error={formState.errors.password} />}
                        <TextField
                            name="password2"
                            type="password"
                            label="Repetir Contraseña"
                            defaultValue={formState.data?.password2}
                            placeholder="Contraseña2"
                        />
                        {formState.errors?.password2 && <FormError error={formState.errors.password2} />}
                        <InputBase name="avatarUrl" type="hidden" value={selectedImage.url} />
                        <InputBase name="avatarAlt" type="hidden" value={selectedImage.alt} />
                        <InputBase name="avatarWidth" type="hidden" value={selectedImage.width.toString()} />
                        <InputBase
                            name="avatarHeight"
                            type="hidden"
                            value={selectedImage.height.toString()}
                        />

                        <Dropdown trigger={TriggerType.CLICK} placement="right-end" className="self-start">
                            <DropdownTrigger variant="outline" shadow={false}>
                                <Image
                                    src={selectedImage.url}
                                    width={selectedImage.width}
                                    height={selectedImage.height}
                                    alt={selectedImage.alt}
                                    className="w-20 rounded-md"
                                />
                            </DropdownTrigger>
                            <DropdownMenu variant="accent">
                                {AVATAR_DATA.map((avatar) => (
                                    <DropdownItem key={avatar.url} onClick={() => handleSelectAvatar(avatar)}>
                                        <Image
                                            src={avatar.url}
                                            width={avatar.width}
                                            height={avatar.height}
                                            alt={avatar.alt}
                                            className="min-w-20"
                                        />
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </Stack>

                    {formState.serverError && <FormError error={[formState.serverError]} />}
                    <CardActions>
                        <Button type="submit">Enviar</Button>
                        <Button>Cancelar</Button>
                    </CardActions>
                    <Link href={"/login"}>Ir a Login</Link>
                </CardContent>
            </Card>
        </form>
    );
}
