import React from 'react';

class Menu extends React.Component {

    componentDidMount() {
        global.document.addEventListener('click', this.handleClick, false)
    }
    componentWillUnmount() {
        global.document.removeEventListener('click', this.handleClick, false)
    }
    handleClick = (event) => {
        var elements = document.querySelectorAll('section.menu .sort-button');
        if(event.target.classList.contains('sort-button')) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('active');
                event.target.classList.add('active');
            }
        }
    }
    sort = (args) => {
        this.props.updateView(args);
    }

    page = (args) => {
        this.props.updatePage(args);
    }

    isActive = (args, page, pages) => {
        console.log(pages)
        if(pages === 1) { return false }
        if(args === 'prev' && page !== 1) { return 'prev-button active' }
        if(args === 'prev' && page === 1) { return 'prev-button' }
        if(args === 'next' && page !== pages.length) { return 'next-button active'; }
        if(args === 'next' && page === pages.length) { return 'next-button'; }
    }

    render() {
        const { page, products, pages, productsPerPage } = this.props;
        return (
            <section className="menu">
                <div className="row">
                    <h2>{page * productsPerPage} of {products.length} products</h2>
                    <div className="vertical-divider"></div>
                    <h2 className="sort-by">Sort by:</h2>
                    <button
                        className="sort-button active"
                        onClick={() => this.sort()}>Most Recent
                    </button>
                    <button
                        className="sort-button"
                        onClick={() => this.sort('descending')}>
                        Lowest Price
                </button>
                    <button
                        className="sort-button"
                        onClick={() => this.sort('ascending')}>
                        Highest Price
                </button>
                    <div className="flexible"></div>
                    <div className={this.isActive('prev', page, pages)} onClick={() => this.page('prev')}></div>
                    <div className={this.isActive('next', page, pages)} onClick={() => this.page('next')}></div>
                </div>
                <div className="line"></div>
            </section>
        );
    }
}

export default Menu;