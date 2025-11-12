import {
    Button,
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { IoIosCloseCircle } from "react-icons/io";

interface CartProps {
    open: boolean;
    close: () => void;
}

export default function Cart({ open, close }: CartProps) {
    return (
        <Transition show={open} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 h-full grow flex transform items-center overflow-y-auto transition-all "
                onClose={close}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-neutral/75"
                        aria-hidden="true"
                    />
                </TransitionChild>
                <div className="flex justify-end h-full w-full">
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-x-4 sm:translate-x-0 sm:scale-95"
                        enterTo="opacity-100 translate-x-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-x-0 sm:scale-100"
                        leaveTo="opacity-0 translate-x-4 sm:translate-x-0 sm:scale-95"
                    >
                        <DialogPanel
                            className={`flex flex-col transform overflow-hidden rounded-lg bg-white p-3 shadow-xl transition-all w-[300px] h-full outline-none`}
                        >
                            <div className="flex justify-between items-center pb-2">
                                <span className="grow font-bold text-center">
                                    Seu carrinho
                                </span>
                                <IoIosCloseCircle
                                    onClick={close}
                                    className="text-2xl text-primaryDark cursor-pointer"
                                />
                            </div>
                            <div className="  grow mb-10">conteúdo</div>
                            <Button className="fixed bottom-2 right-2 rounded-2xl px-3 py-1 border border-primary bg-primaryLight text-gray-600">
                                Finalizar compra
                            </Button>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
