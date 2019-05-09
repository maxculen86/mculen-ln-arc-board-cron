import React, { Component } from 'react';

export default class error404 extends Component {
    render() {
        return (
            <section class="apertura">
                <div class="centered-404">
                    <h1 class="error-header">
                        Oops! El video que estás buscando ya no existe
                    </h1>
                    <p class="error-text">
                        <span>
                            Para ir a la página principal hacé{' '}
                            <a href="/">click aquí</a>,
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
