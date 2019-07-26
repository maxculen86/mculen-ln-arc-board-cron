import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';

const sections = [
    'Apertura',
    'Destacado',
    'PreContenido',
    'Cuerpo',
    'Pie',
    'Tercera'
];

export default class LNNotaReceta extends Component {
    static sections = sections;

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        const { children } = this.props;

        return (
            <article className="lay brando">
                <main>
                    <header className="row titulo">
                        <div className="col-12">
                            {/* APERTURA (Banner, breadcrumb, logo+titulo) */}
                            {children[0]}
                        </div>
                    </header>
                    <div className="row aper-receta w-100 hlp-marginBottom-40">
                        {/* Destacado (Sections, Tags, porciones y tiempo, media detacado) */}
                        {children[1]}
                    </div>

                    {/* POR DEFINIR  */}
                    {children[2]}
                    {children[3]}
                    {children[4]}
                    {children[5]}
                </main>
            </article>
        );
    }
}
