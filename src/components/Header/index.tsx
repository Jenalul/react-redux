import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../features/user/userSlice";

export function Header() {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    function handleLogin() {
        navigate("/");
    }

    function handleLogout() {
        dispatch(logoutUser());
        navigate("/");
    }

    return (
        <header className="w-full bg-neutral-800 text-white">
            <div className="w-full max-w-7xl h-16 font-medium flex items-center justify-between px-3 mx-auto">
                <Link to="/">
                    <h1 className="text-2xl">
                        Dev <span className="text-purple-800">Redux</span>
                    </h1>
                </Link>
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded-md transition-colors hover:bg-red-600 cursor-pointer"
                    >
                        Sair
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="bg-blue-500 px-3 py-1 rounded-md transition-colors hover:bg-blue-600 cursor-pointer"
                    >
                        Fazer login
                    </button>
                )}
            </div>
        </header>
    );
}
