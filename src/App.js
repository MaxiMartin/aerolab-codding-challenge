import React from 'react';
import Nav from './components/nav';
import Header from './components/header';
import Menu from './components/menu';
import Products from './components/products';
import Footer from './components/footer';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';

var currentPage = 1;

const API = {
    'user': 'https://private-anon-8f022714d5-aerolabchallenge.apiary-proxy.com/user/me',
    'products': 'https://private-anon-8f022714d5-aerolabchallenge.apiary-proxy.com/products',
    'points': 'https://private-anon-8f022714d5-aerolabchallenge.apiary-proxy.com/user/points',
    'history': 'https://private-anon-8f022714d5-aerolabchallenge.apiary-proxy.com/user/history',
    'redeem': 'https://private-anon-8f022714d5-aerolabchallenge.apiary-proxy.com/redeem',
    'key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjkwNGFlNDAyOTljZjAwNWJiZTljNDYiLCJpYXQiOjE1MzYxODMwMTJ9.hexa0tfAuJkKx4gOkjan5twnnvuwNpl9-XckVBc45wM'
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            products: [],
            currentPage: 1,
            productsPerPage: 16,
            startItem: 0,
            pages: []
        };

        this.onClick = this.onClick.bind(this);
        this.Paginate = this.Paginate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    handleClick = (event) => {
        if (event.target.className.includes('pepe') &&
            this.state.activeSelected !== ''
        ) this.setState({ activeSelected: '' });
    }

    pageNumbers = (json) => {
        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(json.length / this.state.productsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    onClick = () => {
        this.componentDidMount();
    }

    Paginate = (i) => {
        currentPage = i;
        this.setState({
            startItem: currentPage > 1 ? currentPage * this.state.productsPerPage - this.state.productsPerPage : 0,
            endItem: this.state.productsPerPage * i
        });
    }

    updatePage = (args) => {
        const { pages, productsPerPage } = this.state;
        if (args === 'prev' && currentPage > 1) {
            currentPage--;
            this.setState({
                startItem: currentPage * productsPerPage - productsPerPage,
                endItem: currentPage * productsPerPage
            });
        }
        if (args === 'next' && currentPage < pages.length) {
            currentPage++;
            this.setState({
                startItem: currentPage * productsPerPage - productsPerPage,
                endItem: currentPage * productsPerPage
            });
        }
    }

    updateView = (type) => {
        const { products } = this.state;
        if (type === 'descending') {
            products.sort((a, b) => a.cost - b.cost)
        } else if (type === 'ascending') {
            products.sort((a, b) => a.cost - b.cost).reverse()
        } else {
            products.sort((a, b) => a.originalIndex - b.originalIndex)
        }
        this.setState({ products })
    }

    updateWindowDimensions = () => {
        if (window.innerWidth <= 860) {
            this.setState({ width: window.innerWidth, productsPerPage: 8, pages: this.pageNumbers(this.state.products) });
        }
        if (window.innerWidth > 860) {
            this.setState({ width: window.innerWidth, productsPerPage: 16, pages: this.pageNumbers(this.state.products) });
        }
    }

    redeemConfirm = (data) => {
        confirmAlert({
            message: 'Are you sure you want to redeem this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.fetchRedeem(data)
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    redeemProductNow = (id) => {
        let data = { 'productId': id };
        this.redeemConfirm(data);
    }

    fetchUser() {
        fetch(API.user, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
                "Authorization": API.key
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                user: json
            });
        })
    }

    fetchProducts() {
        fetch(API.products, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
                "Authorization": API.key
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            for (let i = 0; json.length > i; i++) { json[i]['originalIndex'] = i; }
            this.setState({
                products: json,
                pages: this.pageNumbers(json)
            });
        })
    }

    fetchRedeem(data) {
        fetch(API.redeem, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
                "Authorization": API.key
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json()
        }).then(json => {
            if (json.message === 'You\'ve redeem the product successfully') {
                this.fetchUser();
                this.fetchProducts();
            }
        })
    }

    componentDidMount() {
        this.fetchUser();
        this.fetchProducts();
        global.document.addEventListener('click', this.handleClick, false);
        window.addEventListener('resize', this.updateWindowDimensions);
        window.addEventListener('load', this.updateWindowDimensions);
        document.title = "Aerolab codding challenge";
    }

    componentWillUnmount() {
        global.document.removeEventListener('click', this.handleClick, false);
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.addEventListener('load', this.updateWindowDimensions);
    }

    render() {
        return (
            <main>
                <Nav
                    name={this.state.user.name}
                    points={this.state.user.points}
                />

                <Header />

                <Menu
                    page={currentPage}
                    pages={this.state.pages}
                    productsPerPage={this.state.productsPerPage}
                    products={this.state.products}
                    updateView={this.updateView}
                    updatePage={this.updatePage}
                />

                <Products
                    page={currentPage}
                    productsPerPage={this.state.productsPerPage}
                    startItem={this.state.startItem}
                    endItem={this.state.endItem}
                    products={this.state.products}
                    user={this.state.user}
                    redeemProductNow={this.redeemProductNow}
                />

                <Footer
                    page={currentPage}
                    pages={this.state.pages}
                    updatePage={this.updatePage}
                />
            </main>
        );
    }
}

export default App;