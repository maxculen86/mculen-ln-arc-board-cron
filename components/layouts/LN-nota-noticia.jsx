import React from 'react';
import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/pages/recipe.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';

// TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
// EL COMPONENTE Y EN OTROS NO
import '../../resources/dist/css/ln/components/button.css';
import '../../resources/dist/css/ln/components/date.css';
import '../../resources/dist/css/ln/components/tag.css';
import '../../resources/dist/css/ln/components/author.css';
import '../../resources/dist/css/ln/components/lead.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';
import '../../resources/dist/css/ln/components/blockquote.css';
import '../../resources/dist/css/ln/components/text.css';
import '../../resources/dist/css/ln/components/link.css';
import '../../resources/dist/css/ln/components/subtitle.css';
import '../../resources/dist/css/ln/components/slider.css';
import '../../resources/dist/css/ln/components/epigraph.css';
import '../../resources/dist/css/ln/components/appointment.css';

const lnNotaNoticia = ({ children }) => {
    return (
        <div id="wrapper" className="nota noticia">
            <main>
                <div className="row">
                    <div className="lay-sidebar">
                        <div className="sidebar-main">{children[5]}</div>
                        <div className="sidebar__aside" />
                    </div>
                </div>
            </main>
        </div>
    );
};

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
    'Bottom-Tercera'
];

lnNotaNoticia.sections = pageBuilderSections;

export default lnNotaNoticia;
