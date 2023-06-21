export default function NotLoggedIn() {
    return (
        <>
            {window.location.href !== "https://admdacbiogen.netlify.app" ? ( //ruta donde se haga deploy
                <div className="flex absolute w-full justify-center bg-gray-50 h-full">
                    <h1 className="bg-yellow-200 rounded-3xl p-4 font-bold h-fit text-xl">
                        POR FAVOR INICIE SESIÓN PARA ACCEDER AL SISTEMA
                    </h1>
                </div>
            ) : null}
        </>
    );
}
