import ApplicationLogo from "@/Components/ApplicationLogo";
import Cart from "@/Components/Cart";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { PiShoppingCartSimple } from "react-icons/pi";

interface WelcomeProps {
    auth: {
        user: {
            name: string;
        } | null;
    };
    laravelVersion: string;
    phpVersion: string;
}

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: WelcomeProps) {
    const [showCart, setShowCart] = useState(false);
    return (
        <>
            <Head title="Home" />
            <div className="bg-neutral text-black">
                <div className="relative flex min-h-screen flex-col items-center justify-center  selection:text-white">
                    <div className="relative w-full px-6">
                        <header className="flex items-start gap-2 py-10">
                            <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />

                            <nav className="flex flex-1 justify-end gap-3">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="text-black transition hover:scale-105 hover:border-b-primary hover:border-b"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={route("login")}
                                            className="text-black transition hover:scale-105 hover:border-b-primary hover:border-b"
                                        >
                                            Entrar
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className=" text-black transition hover:scale-105 hover:border-b-primary hover:border-b"
                                        >
                                            Cadastrar
                                        </Link>
                                        <span
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-primaryLight cursor-pointer ml-4"
                                            onClick={() => setShowCart(true)}
                                        >
                                            <PiShoppingCartSimple className="text-xl" />
                                        </span>
                                    </div>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="block md:flex items-center justify-between ">
                                <nav className="mb-2">
                                    <span className="p-2 cursor-pointer">
                                        Calçados
                                    </span>
                                    <span className="p-2 cursor-pointer">
                                        Acessórios
                                    </span>
                                    <span className="p-2 cursor-pointer">
                                        Calçados
                                    </span>
                                </nav>
                                <div>
                                    <TextInput
                                        type="text"
                                        placeholder="O que você está procurando?"
                                        className="w-[300px]"
                                        icon={<GoSearch />}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-6 flex-wrap justify-center mt-6">
                                <div className="p-2 w-[300px] h-[300px] border border-primary rounded-2xl">
                                    card do produto
                                </div>
                                <div className="p-2 w-[300px] h-[300px] border border-primary rounded-2xl">
                                    card do produto
                                </div>
                                <div className="p-2 w-[300px] h-[300px] border border-primary rounded-2xl">
                                    card do produto
                                </div>
                                <div className="p-2 w-[300px] h-[300px] border border-primary rounded-2xl">
                                    card do produto
                                </div>
                                <div className="p-2 w-[300px] h-[300px] border border-primary rounded-2xl">
                                    card do produto
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black ">
                            <div className="flex justify-center gap-6">
                                <div className="">
                                    Informações sobre pagamento
                                </div>
                                <div>Navegação - links úteis</div>
                                <div>Redes sociais</div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            <Cart open={showCart} close={() => setShowCart(false)} />
        </>
    );
}
