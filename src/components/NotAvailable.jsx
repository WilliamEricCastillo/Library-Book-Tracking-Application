import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

function NotAvailable() {
    const URL = "http://localhost:3001";
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        fetch(`${URL}/books?avail=true`)
            .then(res => res.json())
            .then(data => {
                setBooksData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const navigate = useNavigate();

    const handleBookClick = (id) => {
        navigate(`/books/${id}`);
    };

    return (
        <div>
            <NavBar />
            <br></br>
            <br></br>
            <p>Books Available To Check Out</p>
            <div>
                <table id="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {booksData.map(({ id, title }) => (
                        <tr key={id} onClick={() => handleBookClick(id)}>
                            <td>{id}</td>
                            <td>{title}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default NotAvailable;
