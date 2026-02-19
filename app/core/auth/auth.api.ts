import { RegisterForm, UserApiResponse } from "./auth.type";

export const BASE_URL = "https://eleven-code-api-javier-ibanez.vercel.app/api";


export const registerApi = async (newUserData: RegisterForm): Promise<UserApiResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(newUserData)
        })
        if (!response.ok) {
            console.error("ERROR DESDE EL SERVIDOR")
        }
        const data = await response.json();
        return data


    } catch (err) {
        console.error("se ha producido un error", err)
        throw err
    }
}

// export const loginApi = async (userData: Login): Promise<UserResponse> => {
//     try {
//         const response = await api.post<UserResponse>("/auth/login", userData);
//         return response.data
//     } catch (err) {
//         throw err
//     }
// }

// export const logoutApi = async (): Promise<LogoutResponse> => {
//     try {
//         const response = await api.post<LogoutResponse>("/auth/logout");
//         return response.data;
//     } catch (err) {
//         throw err
//     }
// }

// export const patchUserApi = async (userId: User["_id"], newUSerData: User): Promise<User> => {
//     try {
//         const response = await api.patch<User>(`/users/${userId}`, newUSerData);
//         return response.data;
//     } catch (err) {
//         throw err
//     }
// }