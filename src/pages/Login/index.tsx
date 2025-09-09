import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUser } from "../../features/user/userSlice";

export function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        if (user) {
            navigate("/admin");
        }
    }, [navigate, user]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (name === "" || email === "") {
            alert("Digite os dados de usuário.");
            return;
        }

        dispatch(
            createUser({
                name: name,
                email: email,
            })
        );
    }

    return (
        <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-100 px-3">
            <Link to="/">
                <h1 className="text-2xl font-medium mb-4">
                    Dev <span className="text-purple-800">Redux</span>
                </h1>
            </Link>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-3"
            >
                <div>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome..."
                    />
                </div>
                <div>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email..."
                    />
                </div>
                <button
                    className="font-medium text-white bg-blue-500 transition-colors hover:bg-blue-600 cursor-pointer py-2 rounded-md"
                    type="submit"
                >
                    Acessar
                </button>
            </form>
        </main>
    );
}
