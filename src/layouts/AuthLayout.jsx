import { Outlet } from "react-router-dom"; //inyecta los componenetes hijos que hayamos definifo en los routing

const AuthLayout = () => {
    return (
        <>
            <main className=" mx-auto mt-5 md:mt-20 md:flex">
                <div className=" md:w-2/3 lg:w-2/5">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default AuthLayout;
