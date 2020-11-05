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
            <div className="col-3">
                <ComImage />
            </div>
            <div className="col-9">
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
            </div>
            <ComContainer
                classesNames={classesNames}
                classCondition={classCondition}
            >
                <ComText size={size}>
                    Conforme a <strong> los criterios de</strong>
                </ComText>
                <SvgTrust />
            </ComContainer>

            <ComLink
                link="https://www.lanacion.com.ar/tema/trust-project-tid68036"
                size={size}
            >
                Más información
            </ComLink>
        </section>
    );
};

export default ModWikiAuthor;
