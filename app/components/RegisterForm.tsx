"use client";

import { Card, CardContent, Container, InputBase, Stack, TextField, Typography } from "@mui/material";
import { useActionState, useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AvatarType, RegisterFormState } from "../core/auth/auth.type";
import { useUserStore } from "../core/auth/useUserStore";
import { AVATAR_DATA } from "../data/avatarData";
import { useDevice } from "../hooks/useDevice";
import { actions } from "../lib/actions";
import { PathTypes, TriggerType } from "../types/index.type";
import { Dropdown } from "./Dropdown/Dropdown";
import DropdownItem from "./Dropdown/DropdownItem";
import DropdownMenu from "./Dropdown/DropdownMenu";
import { DropdownTrigger } from "./Dropdown/DropdownTrigger";
import { FormError } from "./FormError";
import Image from "./ui/Image";
import ImageContainer from "./ui/ImageContainer";
import LoadingButton from "./ui/LoadingButton";

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
    user: undefined,
};
const baseBigImageSize = "w-18 md:w-22";
const baseSmallImagesSize = "w-16 md:w-18";

export function RegisterForm() {
    const { isMobile } = useDevice();

    const setUser = useUserStore((state) => state.setUser);
    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState(AVATAR_DATA[0]);
    const [formState, formAction, isPending] = useActionState(actions.auth.registerUserAction, INITIAL_STATE);
    const handleSelectAvatar = useCallback((avatar: AvatarType) => setSelectedImage(avatar), []);

    useEffect(() => {
        if (!formState.data) return;
        if (formState.success && formState.user) {
            setUser(formState?.user);
            router.push("/profile");
        }
    }, [formState.success, formState.data]);

    const dropdownDirection = useMemo(() => {
        if (isMobile) return "col";
        return "row";
    }, [isMobile]);

    return (
        <form action={formAction}>
            <Container maxWidth={isMobile ? "xs" : "sm"}>
                <Card sx={{ overflow: "visible" }}>
                    <CardContent className="flex flex-col gap-2">
                        <Typography variant="h1" className="text-center">
                            Registrarse
                        </Typography>
                        <Stack spacing={0}>
                            <Stack spacing={"4px"}>
                                <TextField
                                    name="name"
                                    type="text"
                                    label="Nombre"
                                    defaultValue={formState.data?.name}
                                    placeholder="Nombre Completo"
                                    size={"small"}
                                />
                                {formState.errors?.name && <FormError error={formState.errors.name} />}
                                <TextField
                                    name="email"
                                    type="email"
                                    label="Email"
                                    defaultValue={formState.data?.email}
                                    placeholder="email@email.com"
                                    size={"small"}
                                />
                                {formState.errors?.email && <FormError error={formState.errors.email} />}
                                <TextField
                                    name="address"
                                    type="text"
                                    label="Direción"
                                    defaultValue={formState.data?.address}
                                    placeholder="Direccion de la Cueva, 2"
                                    size={"small"}
                                />
                                {formState.errors?.address && <FormError error={formState.errors.address} />}
                                <TextField
                                    name="phoneNumber"
                                    type="text"
                                    label="Telefono"
                                    defaultValue={formState.data?.phoneNumber}
                                    placeholder="654789321"
                                    size={"small"}
                                />
                                {formState.errors?.phoneNumber && (
                                    <FormError error={formState.errors.phoneNumber} />
                                )}
                                <TextField
                                    name="password"
                                    type="password"
                                    label="Contraseña"
                                    defaultValue={formState.data?.password}
                                    placeholder="Contraseña2"
                                    size={"small"}
                                />
                                {formState.errors?.password && (
                                    <FormError error={formState.errors.password} />
                                )}
                                <TextField
                                    name="password2"
                                    type="password"
                                    label="Repetir Contraseña"
                                    defaultValue={formState?.data?.password2}
                                    placeholder="Contraseña2"
                                    size={"small"}
                                />
                                {formState.errors?.password2 && (
                                    <FormError error={formState.errors.password2} />
                                )}
                            </Stack>
                            <InputBase name="avatarUrl" type="hidden" value={selectedImage.url} />
                            <InputBase name="avatarAlt" type="hidden" value={selectedImage.alt} />
                            <InputBase
                                name="avatarWidth"
                                type="hidden"
                                value={selectedImage.width.toString()}
                            />
                            <InputBase
                                name="avatarHeight"
                                type="hidden"
                                value={selectedImage.height.toString()}
                            />
                        </Stack>

                        <Dropdown
                            trigger={TriggerType.CLICK}
                            placement={isMobile ? "center-center" : "top-center"}
                            className="self-center"
                        >
                            <DropdownTrigger variant="outline" shadow={false}>
                                <ImageContainer size={baseBigImageSize}>
                                    <Image
                                        src={selectedImage.url}
                                        width={selectedImage.width}
                                        height={selectedImage.height}
                                        alt={selectedImage.alt}
                                    />
                                </ImageContainer>
                            </DropdownTrigger>
                            <DropdownMenu variant="accent" direction={dropdownDirection}>
                                {AVATAR_DATA.map((avatar) => (
                                    <DropdownItem key={avatar.url} onClick={() => handleSelectAvatar(avatar)}>
                                        <ImageContainer size={baseSmallImagesSize}>
                                            <Image
                                                src={avatar.url}
                                                width={avatar.width}
                                                height={avatar.height}
                                                alt={avatar.alt}
                                                className={`${selectedImage.url === avatar.url ? "animate-pulse" : ""}`}
                                            />
                                        </ImageContainer>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        {formState.serverError && <FormError error={[formState.serverError]} />}
                        <Stack
                            flexDirection={isMobile ? "column" : "row"}
                            justifyContent={isMobile ? "start" : "center"}
                            gap={1}
                        >
                            <LoadingButton
                                type="submit"
                                variant="primary"
                                loading={isPending}
                                loadingText="Enviando Formulario"
                            >
                                Enviar
                            </LoadingButton>
                            <LoadingButton variant="danger">Cancelar</LoadingButton>
                        </Stack>
                        <Stack
                            direction={isMobile ? "column" : "row"}
                            gap={isMobile ? 1 : 3}
                            justifyContent={isMobile ? "start" : "center"}
                            alignItems={"center"}
                        >
                            <Typography className="text-text-color-muted">¿Ya tienes una Cuenta?</Typography>
                            <Link href={PathTypes.LOGIN} className="font-bold">
                                Iniciar Sesion
                            </Link>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </form>
    );
}
