import React, { Component } from 'react';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';

export default class Index extends Component {
    state = {
        isMobile: false
    };

    render() {
        return (
            <>
                {!this.state.isMobile && <HeaderDesktop />}
                {this.state.isMobile && <HeaderMobile />}
            </>
        );
    }
}
