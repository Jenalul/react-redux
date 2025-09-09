import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Container } from "../../components/Container";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, type FormEvent } from "react";
import { addAddress, deleteAddress } from "../../features/user/userSlice";

export function Address() {
    const { user } = useAppSelector((state) => state.user);
    const [location, setLocation] = useState<string>(
        user?.address?.location ?? ""
    );
    const [number, setNumber] = useState<string>(user?.address?.number ?? "");
    const dispatch = useAppDispatch();

    function handleRegisterAddress(e: FormEvent) {
        e.preventDefault();
        dispatch(addAddress({ location: location, number: number }));
    }

    function handleDeleteAddress() {
        dispatch(deleteAddress());
        setLocation("");
        setNumber("");
        alert("Endereço deletado.");
    }

    return (
        <Container>
            <nav className="w-full flex items-center mb-4">
                <Link
                    className="font-medium text-white bg-blue-500 transition-colors hover:bg-blue-600 cursor-pointer px-2.5 py-2 rounded-md"
                    to="/admin"
                >
                    Voltar para o painel
                </Link>
            </nav>
            <form
                onSubmit={handleRegisterAddress}
                className="w-full max-w-xl flex flex-col gap-3"
            >
                <fieldset>
                    <legend className="text-xl font-medium">
                        Meu endereço:
                    </legend>
                </fieldset>
                <div>
                    <Input
                        type="text"
                        name="streetName"
                        id="streetName"
                        placeholder="Nome da rua..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        name="streetNumber"
                        id="streetNumber"
                        placeholder="Número da rua..."
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <button
                    className="font-medium text-white bg-blue-500 transition-colors hover:bg-blue-600 cursor-pointer py-2 rounded-md"
                    type="submit"
                >
                    Salvar alteração
                </button>
                {user && user?.address && (
                    <button
                        onClick={handleDeleteAddress}
                        className="font-medium text-white bg-red-500 transition-colors hover:bg-red-600 cursor-pointer py-2 rounded-md"
                    >
                        Deletar endereço
                    </button>
                )}
            </form>
        </Container>
    );
}
