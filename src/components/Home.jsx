import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            <Navbar />

            <h1 class=" mt-20 ml-20 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    DAC Bio&Gen
                </span>{" "}
            </h1>
            <p class="ml-20 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Bienvenido al Sistema Administrador
            </p>
        </>
    );
};

export default Home;
