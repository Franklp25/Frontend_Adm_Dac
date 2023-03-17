import NotLoggedIn from "./NotLoggedIn";

export default function Protected({ children }) {
    let token = null;
    token = localStorage.getItem("token");
    // return <>{token !== null ? <>{children}</> : <NotLoggedIn />}</>;
}
