import React from 'react';
import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/pages/recipe.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';

//TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
//EL COMPONENTE Y EN OTROS NO
import '../../resources/dist/css/ln/components/button.css';
import '../../resources/dist/css/ln/components/date.css';
import '../../resources/dist/css/ln/components/tag.css';
import '../../resources/dist/css/ln/components/author.css';
import '../../resources/dist/css/ln/components/lead.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';

export default function lnNotaNoticia() {
    return (
        <div id="wrapper" className="nota noticia">
            <main>
                <div className="row">
                    <div className="lay-sidebar">
                        <div className="sidebar-main">
                            <p className="text capital">soy un texto</p>
                            <p className="text">
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo
                                soy un texto mas largo soy un texto mas largo{' '}
                            </p>
                            <p className="text">
                                soy un texto mas largo soy un texto{' '}
                                <b>mas largo soy un</b> texto mas largo soy un
                                <a href="" className="link">
                                    {' '}
                                    texto mas largo soy un
                                </a>{' '}
                                texto mas largo soy un texto mas largo soy un
                                texto mas largo soy un texto mas largo soy un
                                texto mas largo soy un texto mas largo soy un
                                texto mas largo soy un texto mas largo{' '}
                            </p>
                            <blockquote className="blockquote">
                                Para la nueva campaña, según el USDA quedarían
                                como remanente final unas 21,63 millones de
                                toneladas versus 22,10 millones de toneladas
                                esperadas en el mercado.toneladas.
                            </blockquote>
                        </div>
                        <div className="sidebar__aside"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
