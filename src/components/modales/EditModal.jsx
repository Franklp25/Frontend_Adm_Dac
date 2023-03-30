function EditModal({ showModal, setShowModal, form }) {
    return (
        <>
            {showModal ? (
                <>
                    <div className="backdrop-blur-sm flex bg-black bg-opacity-50 overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-3">
                        <div className="nn:max-w-sm md:max-w-md 2xl:max-w-xl my-auto  mx-auto">
                            <div className="bg-slate-300 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ">
                                <div className="flex items-start justify-between p-5 border-b-4 border-solid border-white rounded-t ">
                                    <h3 className="w-full font-bold text-center leading-tight text-2xl text-blue-900">
                                        Información a editar
                                    </h3>
                                    <button
                                        className="ml-4 text-2xl bg-transparent border-0 text-red-500 float-right hover:text-red-700"
                                        onClick={() => setShowModal(false)}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {form}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default EditModal;
