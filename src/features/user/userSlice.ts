import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// 1. Definir a interface para o estado do slice
export interface User {
    id: string;
    name: string;
    email: string;
    address: AddressProps | null;
}

export interface UserState {
    user: User | null;
    users: User[];
    loading: boolean;
    userById: User | null;
    loadingUserById: boolean;
    errorUserById: string | null;
}

interface AddressProps {
    location: string;
    number: string;
}

// 2. Definir o estado inicial usando essa interface
const initialState: UserState = {
    user: null,
    users: [],
    loading: false,
    userById: null,
    loadingUserById: false,
    errorUserById: null,
};

interface CreateUserPayload {
    name: string;
    email: string;
}

// 3. Criar o slice
export const userSlice = createSlice({
    name: "user", // Nome do slice
    initialState,
    // "Reducers" são as funções que definem como o estado pode ser atualizado
    reducers: {
        // Use PayloadAction para tipar o conteúdo do `action.payload`
        createUser: (state, action: PayloadAction<CreateUserPayload>) => {
            if (action.payload.name.length < 3) {
                alert("Preencha um nome com no mínimo 3 letras.");
                return;
            }
            state.user = {
                id: crypto.randomUUID(),
                name: action.payload.name,
                email: action.payload.email,
                address: null,
            };
        },
        logoutUser: (state) => {
            state.user = null;
        },
        addAddress: (state, action: PayloadAction<AddressProps>) => {
            if (
                action.payload.location === "" ||
                action.payload.number === ""
            ) {
                alert("Preencha todos os campos.");
                return;
            }
            alert("Dados atualizados!");
            if (state.user) {
                state.user.address = {
                    location: action.payload.location,
                    number: action.payload.number,
                };
            }
        },
        deleteAddress: (state) => {
            if (state.user) {
                state.user.address = null;
            }
        },
        fetchUsers: (state) => {
            state.loading = true;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
            state.loading = false;
        },
        fetchUsersById: (state, _action: PayloadAction<number>) => {
            state.loadingUserById = true;
        },
        fetchUsersByIdSuccess: (state, action: PayloadAction<User>) => {
            state.userById = action.payload;
            state.loadingUserById = false;
            state.errorUserById = null;
        },
        fetchUsersByIdFailure: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
            state.loadingUserById = false;
            state.errorUserById = action.payload;
        },
    },
    // O Toolkit permite escrever lógica "mutável" que ele transforma
    // em atualizações imutáveis por baixo dos panos.
});

// 4. Exportar as actions geradas automaticamente
export const {
    createUser,
    logoutUser,
    addAddress,
    deleteAddress,
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchUsersById,
    fetchUsersByIdSuccess,
    fetchUsersByIdFailure,
} = userSlice.actions;

// 5. Outros códigos, como seletores, podem usar o tipo `RootState` importado
export const selectUser = (state: RootState) => state.user;

// 6. Exportar o reducer do slice
export default userSlice.reducer;
