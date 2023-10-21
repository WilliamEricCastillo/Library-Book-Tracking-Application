import React, { useRef, useState } from "react";
import "../style.css"

function CheckIn() {
    const baseURL = "http://localhost:3001";
    const urlRef = useRef("");
    const [putResult, setPutResult] = useState("");

    async function putData() {
        const url = urlRef.current.value.trim();
        if (!url) {
            setPutResult("Please enter an ID");
            return;
        }

        const putData = {
            avail: true,
            who: "",
            due: "",
        };

        try {
            const res = await fetch(`${baseURL}/books/${url}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer my-token",
                    // "x-access-token": "token-value",
                },
                body: JSON.stringify(putData),
            });

            if (!res.ok) {
                const message = `An error has occurred: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json();

            const result = {
                status: res.status + "-" + res.statusText,
                headers: { "Content-Type": res.headers.get("Content-Type") },
                data: data,
            };

            setPutResult(JSON.stringify(result, null, 2));
            window.location.reload(false);
        } catch (err) {
            setPutResult(err.message);
        }
    }

    const clearPutOutput = () => {
        setPutResult("");
        urlRef.current.value = "";
    };

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>Check In Books</p>
            <div>

                <p>ID <input type="text" ref={urlRef} placeholder="" /></p>

                <button onClick={putData}>Check-in</button>
                <button onClick={clearPutOutput}>Cancel</button>
                {putResult && (
                    <div>
                        <pre>{putResult}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckIn;
