/* eslint-disable func-names */
import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { getSectionStyle } from '../private/common/utils/sectionUtils';

// TODO: pasar a componente que procese el cuerpo!
import ListIngredientes from '../private/LN/nota/apertura/listIngredientes';
import ListPreparacion from '../private/LN/nota/apertura/listPreparacion';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/pages/recipe.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';

const pageBuilderSections = [
    'Pre-Apertura',
    'Apertura',
    'Pos-Apertura',
    'Cuerpo',
    'Pie',
    'Tercera'
];

class LNNotaReceta extends Component {
    static sections = pageBuilderSections;

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.object).isRequired,
        globalContent: PropTypes.shape({
            taxonomy: PropTypes.shape({
                sections: PropTypes.arrayOf(
                    PropTypes.shape({
                        additional_properties: PropTypes.shape({
                            original: PropTypes.shape({
                                style: PropTypes.shape({
                                    section_class: PropTypes.string
                                })
                            })
                        })
                    })
                )
            }).isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);
        const {
            props: {
                globalContent: {
                    taxonomy: { sections }
                }
            }
        } = this;

        this.sectionClass = getSectionStyle(sections);
    }

    render() {
        const { children } = this.props;

        return (
            <>
                <article className={`lay ${this.sectionClass}`}>
                    {/* TODO: ver de cargar solo si hay videos a mostrar */}
                    <script src="https://d328y0m0mtvzqc.cloudfront.net/prod/powaBoot.js" />
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
                        <div>{children[3]}</div>
                        <div>{children[2]}</div>
                        <div>{children[4]}</div>
                        <div>{children[5]}</div>

                        <br />
                        <div>
                            {/* TODO: estos van en el componente que procese el cuerpo! */}
                            <ListIngredientes
                                content_elements={
                                    this.props.globalContent.content_elements
                                }
                            />
                            <br />
                            <ListPreparacion
                                content_elements={
                                    this.props.globalContent.content_elements
                                }
                            />
                        </div>
                    </main>
                </article>
            </>
        );
    }
}

export default Consumer(LNNotaReceta);
