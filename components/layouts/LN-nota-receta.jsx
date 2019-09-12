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

//TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
//EL COMPONENTE Y EN OTROS NO
import '../../resources/dist/css/ln/components/date.css';
import '../../resources/dist/css/ln/components/tag.css';
import '../../resources/dist/css/ln/components/author.css';
import '../../resources/dist/css/ln/components/lead.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';

const pageBuilderSections = [
    'Pre-Titulo',
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Pos-Apertura',
    'Cuerpo',
    'Tercera',
    'Full-Break',
    'Bottom',
    'Bottom-Tercera',
    'Pie'
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
            <main>
                {/* Pre-Titulo: Banners */}
                {children[0]}
                <div className={`lay ${this.sectionClass}`}>
                    {/* TODO: confirmar */}
                    <header className="row titulo">
                        <div className="col-12">
                            {/* Titulo (breadcrumb, logo+titulo) */}
                            {children[1]}
                        </div>
                    </header>
                    {/* Apertura */}
                    {children[2]}
                </div>

                <div className="lay-sidebar">
                    {/* Cuerpo */}
                    <div className="sidebar__main">
                        <div className="row">
                            <div className="col-1 hlp-marginBottom-40 hlp-tablet-none">
                                {/* Left-Cuerpo Shared*/}
                                {children[3]}
                            </div>

                            <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                <div className="row">
                                    {/* Pos-Apertura */}
                                    {children[4]}
                                </div>

                                {/* Cuerpo + tip + MasNotasDe */}
                                {/* TODO: estos van en el componente que procese el cuerpo! */}
                                <div className="row">
                                    <ListIngredientes
                                        content_elements={
                                            this.props.globalContent
                                                .content_elements
                                        }
                                    />
                                    <br />
                                    <ListPreparacion
                                        content_elements={
                                            this.props.globalContent
                                                .content_elements
                                        }
                                    />
                                </div>

                                {children[5]}
                            </div>
                        </div>
                    </div>
                    {/* Tercera */}
                    <div className="sidebar__aside hlp-tablet-none">
                        <div className="row">{children[6]}</div>
                    </div>
                </div>

                {/* TODO: revisar clases del newsLetter Full-Break */}
                {children[7]}

                <div className="lay-sidebar hlp-marginBottom-40">
                    <div className="sidebar__main">
                        {/* Bottom */}
                        {children[8]}
                    </div>
                    <div className="sidebar__aside">
                        {/* Bottom-Tercera */}
                        {children[9]}
                    </div>
                </div>
            </main>
        );
    }
}

export default Consumer(LNNotaReceta);
