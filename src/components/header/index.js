import React from 'react';
import HeaderBackground from '../../assets/header.jpg';

class Header extends React.Component {

    render() {
        const headerStyle = { backgroundImage: `url(${HeaderBackground})` };
        return (
            <header style={headerStyle}>
                <h1>Electronics</h1>
            </header>
        );
    }
}

export default Header;