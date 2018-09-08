import React from 'react';

class Footer extends React.Component {

    page = (args) => {
        this.props.updatePage(args);
    }

    isActive = (args, page, pages) => {
        console.log(pages)
        if (pages === 1) { return false }
        if (args === 'prev' && page !== 1) { return 'prev-button active' }
        if (args === 'prev' && page === 1) { return 'prev-button' }
        if (args === 'next' && page !== pages.length) { return 'next-button active'; }
        if (args === 'next' && page === pages.length) { return 'next-button'; }
    }

    render() {
        const { page, pages } = this.props;
        return (
            <section className="footer">
                <div className="row">
                    <div className="history">View History</div>
                    <div className="flexible"></div>
                    <div className={this.isActive('prev', page, pages)} onClick={() => this.page('prev')}></div>
                    <div className={this.isActive('next', page, pages)} onClick={() => this.page('next')}></div>
                </div>
                <div className="line"></div>
            </section>
        );
    }
}

export default Footer;