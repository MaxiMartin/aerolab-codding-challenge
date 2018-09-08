import React from 'react';
import AerolabLogo from '../../assets/aerolab-logo.svg'
import CoinImage from '../../assets/coin.svg'
class Nav extends React.Component {

    render() {
        const { name, points } = this.props;
        return (
            <nav>
                <ul>
                    <li className="logo"><img src={AerolabLogo} alt="Aerolab Logo" /></li>
                    <li className="flexible"></li>
                    <li className="name">{name}</li>
                    <li className="points">{points}<img src={CoinImage} alt="Total Coins" /></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;