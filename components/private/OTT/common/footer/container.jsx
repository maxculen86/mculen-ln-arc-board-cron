import React, { Component } from 'react';
import FooterComponent from './component';

export default class Footer extends Component {
    handleOpenWindowEvent = page => () => {
        window.open(page);
    };

    render() {
        const year = new Date().getFullYear();

        return (
            <FooterComponent
                year={year}
                handleOpenWindowEvent={handleOpenWindowEvent}
            />
        );
    }
}
