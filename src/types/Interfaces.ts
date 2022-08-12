export interface AuthState {
    name: string | null,
    token: string | null,
};

export interface IAuth {
    name: string,
    token: string
};

export interface IUser {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
};


// firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: ""