import BooksCatalog from './BooksCatalog';
import CheckOutBookPage from './CheckOutBookPage';
import CheckOutBook from './CheckOutBook';
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<BooksCatalog/>}/>
                    <Route path='/books/true' element={<CheckOutBook />} />
                    <Route path='/books/false' element={<CheckOutBookPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
export default App;
