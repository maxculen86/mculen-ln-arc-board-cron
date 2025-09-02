import React, { Component } from 'react';
import FooterComponent from './component';

// TODO: limpieza OTT - Borrar en iteración 2 de 5
export default class Footer extends Component {
    handleOpenWindowEvent = page => () => {
        window.open(page);
    };

    render() {
        const year = new Date().getFullYear();

        return (
            <FooterComponent
                year={year}
                handleOpenWindowEvent={this.handleOpenWindowEvent}
            />
        );
    }
}
