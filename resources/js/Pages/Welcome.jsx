import ApplicationLogo from "@/Components/ApplicationLogo";
import TextInput from "@/Components/TextInput";
import { Head, Link } from "@inertiajs/react";
import { GoSearch } from "react-icons/go";
import { PiShoppingCartSimple } from "react-icons/pi";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Home" />
            <div className="bg-neutral text-black">
                <div className="relative flex min-h-screen flex-col items-center justify-center  selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex items-center gap-2 py-10">
                            <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />

                            <nav className="flex flex-1 justify-end gap-3">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={route("login")}
                                            className="flex items-center gap-1 rounded-md p-2 text-black ring-1 ring-primary  transition hover:text-black/70 focus:outline-none"
                                        >
                                            Entrar
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md p-2 text-black ring-1 ring-primary  transition hover:text-black/70 focus:outline-none"
                                        >
                                            Cadastrar
                                        </Link>
                                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primaryLight cursor-pointer">
                                            <PiShoppingCartSimple className="text-xl" />
                                        </span>
                                    </div>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="flex items-center justify-between">
                                <nav>
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
                                        className="w-[300px] rounded-md border-primaryLight shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 px-3 py-2"
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
        </>
    );
}
