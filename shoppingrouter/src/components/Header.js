import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {

    render() {
        let render = {}
        if (this.props.isLogged) {
            render =    <ul style={{listStyleType:"none"}}>
                        <li><Link to='/list'>List</Link></li>
                        <li><Link to='/form'>Add Item</Link></li>
                        <li><Link to='/' onClick={this.props.onLogout}>Logout</Link></li>
                        </ul>
        } else {
            render =    <ul style={{listStyleType:"none"}}>
                        <li><Link to='/'>Login</Link></li>
                        </ul>
        }
    
        return(
            <header>
                <nav>
                    {render}
                </nav>
            </header>
        )
    }
}