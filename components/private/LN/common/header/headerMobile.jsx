import React, { Component } from 'react';
import Header from './headerBase';

export default class HeaderMobile extends Component {
    render() {
        return (
            <Header id="header-mobile" className="header-mobile">
                <div className="col-6">
                    <a className="header-mobile__logo">
                        <i className="logo-la-nacion"></i>
                    </a>
                </div>
                <div className="col-6 hlp-text-right">
                    <a>Suscribite</a>
                </div>
            </Header>
        );
    }
}
