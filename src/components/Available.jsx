import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

function Available() {
    const baseURL = "http://localhost:3001";

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${baseURL}/books?avail=false`)
            .then(res => {
                return res.json();
            })
            .then(actualData => {
                console.log(actualData);
                setData(actualData);

            });
    }, []);

    let navigate = useNavigate();

    return (

        <div>
            <NavBar/>
            <br></br>
            <br></br>
            <p>Books Checked Out</p>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map(({ id, title }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Available