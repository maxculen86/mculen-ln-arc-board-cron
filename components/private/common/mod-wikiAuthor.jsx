import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './com-text';
import ComLink from './com-link';
import ComContainer from './com-container';
import ListSocialIcons from './list-socialicons';
import ModImage from './mod-image';
import ComTitle from './com-title';
import ComParagraph from './com-paragraph';

const ModWikiAuthor = props => {
    const { classesNames, classCondition, size } = props;

    return (
        <section
            className={`mod-wikiauthor ${classesNames || ''} ${classCondition ||
                ''}`}
        >
            <div className="row">
                <div className="col-4">
                    <img
                        alt="Pagni"
                        src="https://bucket3.glanacion.com/anexos/fotos/88/3206588h160.png"
                    />
                    {/* <ModImage /> */}
                </div>
                <div className="col-8">
                    <ComTitle tag="h2" content="Nombre Autor" size="--l" />
                    <ComTitle tag="h4" content="Profesión" size="--threexs" />
                    <ComContainer>
                        <ComLink>cpagni@lanacion.com</ComLink>
                        <ComLink>www.carlospagni.com</ComLink>
                    </ComContainer>
                    <ComParagraph>
                        Columnista político del diario LA NACION. Es profesor de
                        Historia en la Universidad Nacional de Mar del Plata y
                        fue docente de la cátedra de Historia de las Ideas
                        Políticas de la Facultad de Derecho de la Universidad
                        Nacional de Mar del Plata, e investigador del Instituto
                        Emilio Ravignani de la Facultad de Filosofía y Letras de
                        la UBA. Presta servicios de consultoría política para
                        instituciones y empresas del país y el exterior. En 2002
                        fue condecorado por el gobierno de la República de
                        Brasil con la Orden de Río Branco.
                    </ComParagraph>
                    <ComContainer>
                        <ComTitle tag="h3" content="Educación" size="--l" />
                        <div>
                            Periodismo, Universidad de Buenos Aires, 1989.
                        </div>
                        <div>
                            Periodismo, Universidad de Buenos Aires, 1989.
                        </div>
                    </ComContainer>
                    <ComContainer>
                        <div>Reconocimientos</div>
                        <div>
                            Condecorado por el gobierno de la República de
                            Brasil con la Orden de Río Branco, 2002.
                        </div>
                        <div>
                            Condecorado por el gobierno de la República de
                            Brasil con la Orden de Río Branco, 2002.
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
                <div className="col-12">
                    <ListSocialIcons />
                </div>
            </div>
        </section>
    );
};

export default ModWikiAuthor;
