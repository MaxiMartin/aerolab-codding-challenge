import React from 'react';
import ImageLoader from 'react-loading-image';
import CoinIcon from '../../assets/coin.svg';
import LoaderIcon from '../../assets/loader.svg';

class Products extends React.Component {

    redeemProduct = (id) => {
        this.props.redeemProductNow(id);
    } 

    isAvailable = (switcher, cost, points, id) => {
        switch (switcher) {
            case 'classList':
                if (cost <= points) {
                    return 'card available';
                }
                return 'card';
            case 'redeem':
                if (cost <= points) {
                    return <div className="redeem-container">
                        <div className="redeem-info">
                            <div className="cost">{cost} <img src={CoinIcon} alt={cost} /></div>
                            <div className="button" onClick={() => this.redeemProduct(id)}>Redeem Now</div>
                        </div>
                    </div>;
                }
                return false;
            case 'buyIcon':
                if (cost <= points) {
                    return <div className="icon-available"></div>;
                }
                return <div className="icon-no-available">You need {cost} <img src={CoinIcon} alt={cost} /></div>;
            default:
        }
    }

    render() {
        const { products, user, startItem, productsPerPage, page } = this.props;
        let endItem = productsPerPage * page;
        return (
            <section className="products">
                {products.slice(startItem, endItem).map((item, index) => (
                    <div className={this.isAvailable('classList', item.cost, user.points)} key={index}>
                        <div className="image-container">
                            <ImageLoader
                                alt={item.name}
                                src={`${item.img.url}`}
                                srcSet={`${item.url}, ${item.img.hdUrl} 2x`}
                                loading={() => <div className="loader"><img src={LoaderIcon} alt="Loader" /></div>}
                                error={() => <div>Error</div>}
                            />
                        </div>
                        <div className="line"></div>
                        <div className="spacer"></div>
                        <div className="info">
                            <div className="category">{item.category}</div>
                            <div className="name">{item.name}</div>
                        </div>
                        {this.isAvailable('redeem', item.cost, user.points, item._id)}
                        {this.isAvailable('buyIcon', item.cost, user.points)}
                    </div>
                ))}
            </section>

        );
    }
}

export default Products;