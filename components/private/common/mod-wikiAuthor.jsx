import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './com-text';
import ComLink from './com-link';
import SvgTrust from './svg-trust';
import '../../../resources/dist/css/ln/modules/mod-trust.css';
import ComContainer from './com-container';

const ModWikiAuthor = props => {
    const { classesNames, classCondition, size } = props;
    if (!trustProject) return null;

    return (
        <section
            className={`mod-wikiauthor ${classesNames || ''} ${classCondition ||
                ''}`}
        >
            <div className="col-4">
                <ComImage />
            </div>
            <div className="col-8">
                <div>Nombre Autor</div>
                <div>Profesión</div>
                <ComContainer>
                    <div>cpagni@lanacion.com</div>
                    <div>www.carlospagni.com</div>
                </ComContainer>
                <div>
                    Columnista político del diario LA NACION. Es profesor de
                    Historia en la Universidad Nacional de Mar del Plata y fue
                    docente de la cátedra de Historia de las Ideas Políticas de
                    la Facultad de Derecho de la Universidad Nacional de Mar del
                    Plata, e investigador del Instituto Emilio Ravignani de la
                    Facultad de Filosofía y Letras de la UBA. Presta servicios
                    de consultoría política para instituciones y empresas del
                    país y el exterior. En 2002 fue condecorado por el gobierno
                    de la República de Brasil con la Orden de Río Branco.
                </div>
                <ComContainer>
                    <div>Educacion</div>
                    <div>Periodismo, Universidad de Buenos Aires, 1989.</div>
                    <div>Periodismo, Universidad de Buenos Aires, 1989.</div>
                </ComContainer>
                <ComContainer>
                    <div>Reconocimientos</div>
                    <div>
                        Condecorado por el gobierno de la República de Brasil
                        con la Orden de Río Branco, 2002.
                    </div>
                    <div>
                        Condecorado por el gobierno de la República de Brasil
                        con la Orden de Río Branco, 2002.
                    </div>
                </ComContainer>
                <ComContainer>
                    <div>Idiomas:</div>
                    <div>Ingles</div>
                    <div>Frances</div>
                </ComContainer>
                <ComContainer>
                    <div>Membresías profesionales:</div>
                    <div>Academia de Periodismo.</div>
                </ComContainer>
                <ComContainer>
                    <div>Publicaciones</div>
                    <div>Carlos Pagni en Odisea Argentina, Editorial.</div>
                    <div>Carlos Pagni en Odisea Argentina, Editorial.</div>
                </ComContainer>
                <ComContainer>
                    <div>Podscat</div>
                    <div>Carlos Pagni en Odisea Argentina.</div>
                    <div>Carlos Pagni en Odisea Argentina.</div>
                </ComContainer>
            </div>
        </section>
    );
};

export default ModWikiAuthor;
