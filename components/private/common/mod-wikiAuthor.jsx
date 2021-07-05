import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './text';
import ComLink from './com-link';
import ComContainer from './com-container';
import ListSocialIcons from './list-socialicons';
import ModImage from './mod-image';
import ComTitle from './com-title';
import ComParagraph from './com-paragraph';
import ModDescriptionList from './mod-descriptionList';
import ModFigure from './mod-figure';
import ComAdvance from './com-advance';

const ModWikiAuthor = props => {
    const { classesNames, classCondition, size } = props;

    return (
        <section
            className={`mod-wikiauthor ${classesNames || ''} ${classCondition ||
                ''}`}
        >
            <div className="row">
                <div className="col-12 col-desksm-4">
                    <ModFigure />
                </div>
                <div className="col-12 col-desksm-8">
                    <ComContainer classCondition="--info">
                        <ComTitle tag="h2" content="Nombre Autor" size="--l" />
                        <ComText text="Profesión" size="--threexs" />
                        <ComContainer>
                            <ModDescriptionList size="--threexs" />
                        </ComContainer>
                        <ComParagraph
                            size="--threexs"
                            content="Columnista político del diario LA NACION. Es profesor de Historia en la Universidad Nacional de Mar del Plata y fue docente de la cátedra de Historia de las Ideas Políticas de la Facultad de Derecho de la Universidad Nacional de Mar del Plata, e investigador del Instituto Emilio Ravignani de la Facultad de Filosofía y Letras de la UBA. Presta servicios de consultoría política para instituciones y empresas del país y el exterior. En 2002 fue condecorado por el gobierno de la República de Brasil con la Orden de Río Branco."
                        />
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Publicaciones"
                                size="--threexs"
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Reconocimientos"
                                size="--threexs"
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Idiomas:"
                                size="--threexs"
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Membresías profesionales:"
                                size="--threexs"
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Publicaciones"
                                size="--threexs"
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Reconocimientos"
                                size="--threexs"
                            />
                        </ComContainer>
                    </ComContainer>
                </div>
                <div className="col-12">
                    <ComContainer classCondition="--socialicons">
                        <ComTitle
                            tag="h4"
                            content="Conectar"
                            size="--threexs"
                        />
                        <ListSocialIcons size="--threexs" />
                    </ComContainer>
                </div>
            </div>
        </section>
    );
};

export default ModWikiAuthor;
