import { Dialog, DialogPanel, Transition } from '@headlessui/react';

export default function Modal({
    title = 'Modal title',
    description = 'Modal description',
    show = false,
    closeable = true,
    onClose = () => {},
    onClick = () => {},
    maxWidth = '2xl',
    infoModal = false,
}) {
    const close = () => closeable && onClose();

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show} appear>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClose={() => {}}
            >
                <Transition.Child
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-black/50" />
                </Transition.Child>

                <Transition.Child
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <DialogPanel
                        className={`relative w-full bg-white rounded-lg shadow-xl p-6 ${maxWidthClass}`}
                    >
                        <Dialog.Title className="text-lg font-semibold text-center">
                            {title}
                        </Dialog.Title>

                        <Dialog.Description className="text-sm text-gray-600 mt-2 text-center">
                            {description}
                        </Dialog.Description>

                        <div className="mt-6 flex justify-between">
                            {!infoModal &&
                                <button
                                    className="btn btn-sm btn-primary w-25"
                                    onClick={close}
                                >
                                    Close
                                </button>
                            }
                            <button
                                className={`btn btn-sm  ${infoModal ? 'w-50 mx-auto btn-success' : 'w-25 btn-danger'}`}
                                onClick={onClick}
                            >
                                OK
                            </button>
                        </div>
                    </DialogPanel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
