import React, { Component } from 'react';

export default class Index extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="row mod-opening-revista with-hl">
                {/* LUGAR PARA EL ANEXO */}
                {children}
                <section className="lay">
                    <div className="com-share">
                        <a
                            href="https://www.facebook.com/ohlalarevista/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <i className="icon-facebook"></i>
                        </a>
                        <a
                            href="https://twitter.com/RevistaOhlala/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <i className="icon-twitter"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/ohlalarevista/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <i className="icon-instagram"></i>
                        </a>
                    </div>
                    <div className="logo">
                        <i className="logo-ohlala"></i>
                    </div>
                    <div className="links">
                        {/* MAXIMO 5 */}
                        <a className="com-link" href=" ">
                            Cocina healthy
                        </a>
                        <a className="com-link" href=" ">
                            OHLALÁ! Viaja
                        </a>
                        <a className="com-link" href=" ">
                            Project planner
                        </a>
                        <a className="com-link" href=" ">
                            Fábrica OHLALÁ!
                        </a>
                        <a className="com-link" href=" ">
                            OHLALÁ! Fest
                        </a>
                    </div>
                </section>
            </div>
        );
    }
}
