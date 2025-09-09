import { Link } from "react-router-dom";
import { Container } from "../../components/Container";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    deleteAddress,
    fetchUsers,
    fetchUsersById,
} from "../../features/user/userSlice";
import { Input } from "../../components/Input";
import { useState } from "react";

export function Admin() {
    const [userId, setUserId] = useState<string>("");
    const dispatch = useAppDispatch();
    const { user, users, userById, loading, loadingUserById, errorUserById } =
        useAppSelector((state) => state.user);

    function handleDeleteAddress() {
        dispatch(deleteAddress());
        alert("Endereço deletado.");
    }

    function handleFetchUsers() {
        dispatch(fetchUsers());
    }

    function handleFetchUsersById() {
        if (isNaN(parseInt(userId)) || userId.trim() === "") {
            alert("Informe um ID válido.");
            return;
        }
        dispatch(fetchUsersById(parseInt(userId)));
    }

    return (
        <Container>
            <nav className="w-full flex items-center mb-4">
                <Link
                    className="font-medium text-white bg-blue-500 transition-colors hover:bg-blue-600 cursor-pointer px-2.5 py-2 rounded-md"
                    to="/address"
                >
                    Meus endereços
                </Link>
            </nav>
            <section className="space-y-2.5">
                <h1 className="text-xl font-medium">
                    Olá {user ? user.name : "Visitante"}, bem vindo!
                </h1>
                {user && (
                    <span>
                        <strong className="font-medium">Email</strong>:{" "}
                        {user.email}
                    </span>
                )}
                {user && user.address ? (
                    <>
                        <h2 className="font-medium text-lg">Endereço atual:</h2>
                        <div className="flex flex-col gap-2.5 min-[28rem]:flex-row min-[28rem]:items-center">
                            <span>
                                {user.address.location}, n°{" "}
                                {user.address.number}
                            </span>
                            <button
                                onClick={handleDeleteAddress}
                                className="text-white font-medium bg-red-500 px-3 py-1 rounded-md transition-colors hover:bg-red-600 cursor-pointer"
                            >
                                Deletar endereço
                            </button>
                        </div>
                    </>
                ) : (
                    <h2>Nenhum endereço cadastrado...</h2>
                )}
            </section>
            <section className="my-4">
                <h2 className="font-medium text-lg mb-2">Lista de Usuários</h2>
                <button
                    onClick={handleFetchUsers}
                    className="font-medium text-white bg-blue-500 transition-colors hover:bg-blue-600 cursor-pointer p-2 rounded-md mb-2.5"
                >
                    Buscar Usuários
                </button>
                {loading && <h2>Carregando usuários...</h2>}
                {!loading && (
                    <ul className="space-y-1">
                        {users.map((user) => (
                            <li key={user.id}>
                                ID: {user.id} | {user.name}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <section className="w-full max-w-xs">
                <div className="flex gap-1.5 mb-2.5">
                    <Input
                        type="text"
                        name="userId"
                        id="userId"
                        placeholder="Buscar usuário pelo ID..."
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <button
                        onClick={handleFetchUsersById}
                        className="font-medium text-white bg-blue-500 transition-colors hover:bg-blue-600 cursor-pointer p-2 rounded-md"
                    >
                        Buscar
                    </button>
                </div>
                {loadingUserById && <h2>Buscando usuário...</h2>}
                {!loadingUserById && errorUserById && (
                    <h2>Usuário não encontrado!</h2>
                )}
                {!loadingUserById && userById && (
                    <h2>
                        {userById.id} | {userById.name}
                    </h2>
                )}
            </section>
        </Container>
    );
}
