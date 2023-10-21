
import { Link } from 'react-router-dom';
import "./navbar.css"

function NavBar() {
    return (
        <div className='NavigationBar'>
            <Link to='/' className='page-link'>Book Catalog</Link>
            <Link to='/books/false' className='page-link'>Check-In-Books</Link>
            <Link to='/books/true' className='page-link'>Check-Out-Books</Link>
        </div>
    );
}

export default NavBar;
