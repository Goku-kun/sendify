import React from "react";
import "./normalize.css";
import "./App.css";
import DropzoneComponent from "../DropzoneComponent/DropzoneComponent";
import { auth } from "../../firebase";
import Login from "../Login/Login";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            uploaded: false,
        };
    }
    onUpload() {
        this.setState({
            uploaded: true,
        });
    }
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(
            function (user) {
                this.setState({ user });
            }.bind(this)
        );
    }
    render() {
        return (
            <div className="App">
                <h1>Sendify</h1>
                <h4>Share your files by creating a URL.</h4>
                {this.state.user === null ? (
                    <Login />
                ) : (
                    <>
                        <button className="logout" onClick={() => auth.signOut()}>
                            Logout
                        </button>
                        <DropzoneComponent />
                    </>
                )}
                <p className="credit">
                    Made with ❤️ by{" "}
                    <a href="https://github.com/Goku-kun" target="_blank" rel="noreferrer">
                        Goku-kun
                    </a>
                </p>
            </div>
        );
    }
}

export default App;
