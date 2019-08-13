import React, { Component } from 'react';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';

export default class Index extends Component {
    state = {
        isMobile: false
    };

    componentDidMount() {
        const viewportWidth =
            window.innerWidth || document.documentElement.clientWidth;

        this.setState({
            isMobile: viewportWidth < 1024
        });
    }

    render() {
        return (
            <>
                {!this.state.isMobile && <HeaderDesktop />}
                {this.state.isMobile && <HeaderMobile />}
            </>
        );
    }
}
