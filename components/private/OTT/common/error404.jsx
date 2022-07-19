import React, { Component } from 'react';

export default class error404 extends Component {
    render() {
        return (
            <section className="apertura">
                <div className="centered-404">
                    <h1 className="error-header">
                        Oops! El video que estás buscando ya no existe
                    </h1>
                    <p className="error-text">
                        <span>
                            Para ir a la página principal hacé
                            <a href="/"> click aquí,</a>
                        </span>
                        <span>
                            {' '}
                            o utilizá el menú de arriba para ir a un programa.
                        </span>
                    </p>
                </div>
            </section>
        );
    }
}
