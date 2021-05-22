import React from "react";
import { signInWithGoogle } from "../../firebase";
import DropzoneComponentIpfs from "../DropzoneComponentIpfs/DropzoneComponentIpfs";

function Login() {
    return (
        <div>
            <div className='sans-serif'>
                <DropzoneComponentIpfs />
            </div>
            <button onClick={signInWithGoogle}>Login with Google!</button>
            <h3>If you want to use firebase instead of IPFS</h3>
        </div>);
}
export default Login;
