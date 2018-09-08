import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Moment from 'react-moment';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    redeemHistory = (data) => {
        let message = data.map((item, i) => (
            <div className="history-container">
                <div className="row">
                    <div>{item.name}</div>
                    <div>
                        <Moment format="DD/MM/YYYY">
                            {item.createDate}
                        </Moment>
                    </div>
                </div>
            </div>
        ));
        confirmAlert({
            title: 'Redeem History',
            message: message,
            buttons: [
                {
                    label: 'Close'
                }
            ]
        })
    };

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

    fetchHistory(API) {
        fetch(API.history, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
                "Authorization": API.key
            },
        }).then(response => {
            return response.json()
        }).then(json => {
            this.redeemHistory(json)
        })
    }

    render() {
        const { page, pages, API } = this.props;
        return (
            <section className="footer">
                <div className="row">
                    <div className="history" onClick={() => this.fetchHistory(API)}>View History</div>
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