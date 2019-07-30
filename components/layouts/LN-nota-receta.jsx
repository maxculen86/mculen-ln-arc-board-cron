import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { getSectionClass } from '../private/common/utils/sectionUtils';

import '../../resources/dist/css/ln/base.css';

const pageBuilderSections = [
    'Apertura',
    'Destacado',
    'PreContenido',
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
                globalContent: { taxonomy }
            }
        } = this;

        this.sectionClass = getSectionClass(taxonomy);
    }

    render() {
        const { children } = this.props;

        return (
            <article className={`lay ${this.sectionClass}`}>
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

export default Consumer(LNNotaReceta);
