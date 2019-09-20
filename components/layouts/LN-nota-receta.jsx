/* eslint-disable func-names */
import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { getSectionStyle } from '../private/common/utils/sectionUtils';
import CabezalDsk from '../../components/private/LN/nota/banners/bannerCabezal';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
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
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';

const pageBuilderSections = [
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Pos-Apertura',
    'Cuerpo',
    'Tercera',
    'Full-Break',
    'Bottom',
    'Bottom-Tercera'
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
            <div id="wrap">
                <Header />
                <main>
                    {/* TODO: pasar esto a otro lado para que solo se cargue cuando hay videos en la pagina */}
                    <script src="https://d328y0m0mtvzqc.cloudfront.net/prod/powaBoot.js" />
                    {/* Pre-Titulo: Banners */}
                    <CabezalDsk />
                    <div className={`lay ${this.sectionClass}`}>
                        {/* TODO: confirmar */}
                        <header className="row titulo">
                            <div className="col-12">
                                {/* Titulo (breadcrumb, logo+titulo) */}
                                {children[0]}
                            </div>
                        </header>
                        {/* Apertura */}
                        {children[1]}
                    </div>

                    <div className="lay-sidebar">
                        {/* Cuerpo */}
                        <div className="sidebar__main">
                            <div className="row">
                                <div className="col-1 hlp-marginBottom-40 hlp-tablet-none">
                                    {/* Left-Cuerpo Shared*/}
                                    {children[2]}
                                </div>

                                <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                    <div className="row">
                                        {/* Pos-Apertura */}
                                        {children[3]}
                                    </div>
                                    {children[4]}
                                </div>
                            </div>
                        </div>
                        {/* Tercera */}
                        <div className="sidebar__aside hlp-tablet-none">
                            <div className="row">{children[5]}</div>
                        </div>
                    </div>

                    {/* TODO: revisar clases del newsLetter Full-Break */}
                    {children[6]}

                    <div className="lay-sidebar hlp-marginBottom-40">
                        <div className="sidebar__main">
                            {/* Bottom */}
                            {children[7]}
                        </div>
                        <div className="sidebar__aside">
                            {/* Bottom-Tercera */}
                            {children[8]}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Consumer(LNNotaReceta);
