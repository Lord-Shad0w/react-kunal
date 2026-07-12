import { useRouteError } from "react-router";

const Error = () => {
    const errMsg = useRouteError();
    console.log(errMsg);
    
    return (
        <div>
            <h1>Oops!!!</h1>
            <h2>Something went wrong !!!</h2>
        </div>
    )
}

export default Error;