import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './com-text';
import ComLink from './com-link';
import ComContainer from './com-container';
import ListSocialIcons from './list-socialicons';
import ModImage from './mod-image';
import ComTitle from './com-title';
import ComParagraph from './com-paragraph';
import ModDescriptionList from './mod-descriptionList';

const ModWikiAuthor = props => {
    const { classesNames, classCondition, size } = props;

    return (
        <section
            className={`mod-wikiauthor ${classesNames || ''} ${classCondition ||
                ''}`}
        >
            <div className="row">
                <div className="col-12 col-desksm-4">
                    <figure role="button" class="mod-figure --horizontal">
                        <div class="mod-picture ">
                            <img
                                decoding="async"
                                sizes="(max-width: 320px) 320px, 100vw"
                                alt="ver que onda"
                                src="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/nMbuBq0SHLPv9uoOJsHiZBeyoYw=/768x513/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg"
                                srcset="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/ezY1Y2EPJ03-B3VE7w9-BkdbE7M=/878x585/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 878w, https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/6dIOTcXXWdSxIlsyai8ipYO2xng=/1120x746/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 1120w, https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/ggRLo5On47hTa_NwiK6ro9kBLHo=/768x512/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 768w, https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/xA7kNFjlRPlM9W2b3WcgWpoMvvg=/350x233/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 350w, https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/TDfmYuDyT8YmvJSFgN6abplHYMM=/310x206/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 310w"
                                class="i-amphtml-fill-content i-amphtml-replaced-content"
                            />
                        </div>
                    </figure>
                </div>
                <div className="col-12 col-desksm-8">
                    <ComContainer classCondition="--info">
                        <ComTitle tag="h2" content="Nombre Autor" size="--l" />
                        <ComText textname="Profesión" size="--threexs" />
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
