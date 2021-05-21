import React from "react";
import { signInWithGoogle } from "../../firebase";

function Login() {
    return <button onClick={signInWithGoogle}>Login with Google!</button>;
}
export default Login;
