import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";

function BooksCatalog() {
    const URL = "http://localhost:3001";
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        fetch(`${URL}/books`)
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
        <>
            <NavBar />
            <div>
                <br></br>
                <br></br>
                <p>Book Catalog</p>
                <table>
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
        </>
    );
}

export default BooksCatalog;
