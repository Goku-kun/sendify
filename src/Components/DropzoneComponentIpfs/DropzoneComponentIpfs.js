import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Loader from "react-loader-spinner";
import useIpfsFactory from '../hooks/use-ipfs-factory.js'
import useIpfs from '../hooks/use-ipfs.js'
import Ipfs from 'ipfs'

function DropzoneComponentIpfs() {
    const { ipfs, ipfsInitError } = useIpfsFactory({ commands: ['id'] })
    const id = useIpfs(ipfs, 'id')
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
        const nodeId = 'ipfs-' + Math.random()
        const node = await Ipfs.create({ repo: nodeId })
        console.log("Your node: " + nodeId)
        window.node = node
        const status = node.isOnline() ? 'online' : 'offline'
        console.log(`Node status: ${status}`)
        console.log(`File name: ${file.name}`)
        async function addFile() {
            const fileAdded = await node.add({
                path: file.name,
                content: file
            })
            console.log('successfully stored', fileAdded)
            setDownloadLink('https://ipfs.io/ipfs/' + fileAdded.cid.toString());
            setFile(null);
            setLoading(false);

        }
        addFile()
        //console.log(await fileRef.getDownloadURL());
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
            <main>
                {ipfsInitError && (
                    <div className>
                        Error: {ipfsInitError.message || ipfsInitError}
                    </div>
                )}
                {id && <IpfsId {...id} />}
            </main>
        </div>
    );
}


const Title = ({ children }) => {
    return (
        <h2>{children}</h2>
    )
}

const IpfsId = (props) => {
    if (!props) return null
    return (
        <section className>

            <div className='pa4'>
                {['id', 'agentVersion'].map((key) => (
                    <div className='mb4' key={key}>
                        <Title>{key}</Title>
                        <div data-test={key}>{props[key]}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default DropzoneComponentIpfs;
