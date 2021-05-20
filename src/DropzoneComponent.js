import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "./firebase";
import { auth } from "./firebase";
import Loader from "react-loader-spinner";

function DropzoneComponent() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [downloadLink, setDownloadLink] = useState(null);
    const onDrop = useCallback(
        function (acceptedFiles) {
            setDownloadLink(null);
            setFile(acceptedFiles[0]);
        },
        [setFile]
    );

    async function handleSubmit() {
        setLoading(true);
        setDownloadLink(null);
        var metaData = {
            id: auth.currentUser.uid,
        };
        var storageRef = storage.ref();
        var fileRef = storageRef.child(file.name);
        await fileRef.put(file, metaData);
        //console.log(await fileRef.getDownloadURL());
        setDownloadLink(await fileRef.getDownloadURL());
        setFile(null);
        setLoading(false);
    }

    function handleCopy() {
        var mediaLink = document.querySelector(".download");
        var range = document.createRange();
        range.selectNode(mediaLink);
        window.getSelection().addRange(range);

        try {
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
        } catch (err) {
            console.log("Oops, unable to copy");
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
    });

    return (
        <div className="drop-zone-comp">
            <div {...getRootProps()} className="drop-zone">
                <input {...getInputProps()} />
                <div className="text" style={{ fontWeight: 900 }}>
                    Drag and drop your file here.
                </div>
            </div>
            {loading && <Loader type="TailSpin" color="#ff7375" height={80} width={80} />}
            {file && !loading && (
                <>
                    <button onClick={handleSubmit}>
                        {" "}
                        <i className="fa fa-download"></i>
                        Generate link
                    </button>
                    <h2>
                        Uploaded: '{file.name}' <button onClick={() => setFile(null)}>X</button>
                    </h2>
                </>
            )}
            {downloadLink && !loading && (
                <>
                    <h2>Copy Link:</h2>
                    <a
                        className="download"
                        href={downloadLink}
                        download
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: 15 }}
                    >
                        {downloadLink}
                    </a>
                    <button style={{ marginTop: 30 }} onClick={handleCopy}>
                        Copy
                    </button>
                </>
            )}
        </div>
    );
}

export default DropzoneComponent;
