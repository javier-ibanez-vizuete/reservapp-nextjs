import { ReactNode } from "react";

type AuthLayoutProps = {
    children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <main>{children}</main>;
}
