import React, { useRef, useState } from "react";
import "../style.css";

function CheckOutForm() {
    const URL = "http://localhost:3001";
    const put_id = useRef(null);
    const put_who = useRef(null);
    const put_due = useRef(null);
    const [putResult, setPutResult] = useState(null);
    const [error, setError] = useState(null);

    async function putData() {
        const id = put_id.current.value;

        if (id) {
            const putData = {
                avail: false,
                who: put_who.current.value,
                due: put_due.current.value,
            };

            try {
                const res = await fetch(`${URL}/books/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer my-token",
                    },
                    body: JSON.stringify(putData),
                });

                if (!res.ok) {
                    const message = await res.text();
                    throw new Error(message);
                }

                const data = await res.json();
                const result = {
                    status: `${res.status}-${res.statusText}`,
                    headers: { "Content-Type": res.headers.get("Content-Type") },
                    data: data,
                };

                setPutResult(JSON.stringify(result, null, 2));
                setError(null);
            } catch (err) {
                setError(err.message);
                setPutResult(null);
            }
        } else {
            setError("Please enter a Book ID.");
            setPutResult(null);
        }
    }

    function clearPutOutput() {
        setPutResult(null);
        setError(null);
        put_id.current.value = "";
        put_who.current.value = "";
        put_due.current.value = "";
    }

    return (
        <div>
            <br></br>
            <fieldset>
                <legend>Check Out Form</legend>
                <label htmlFor="book-id">Book ID:</label>
                <input type="text" id="book-id" ref={put_id} placeholder="" />
                <br />
                <label htmlFor="user-name">Your Name:</label>
                <input type="text" id="user-name" ref={put_who} placeholder="" />
                <br />
                <label htmlFor="due-date">Due Date: (MM/DD/YYYY)</label>
                <input type="text" id="due-date" ref={put_due} placeholder="" />
                <br />
                <button onClick={putData}>Check Out</button>
                <button onClick={clearPutOutput}>Clear</button>
                {error && <div className="error">{error}</div>}
                {putResult && clearPutOutput() &&  (
                    <div>
                        <pre>{putResult}</pre>
                    </div>
                )}
            </fieldset>
        </div>
    );
}

export default CheckOutForm;
