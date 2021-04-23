import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './com-text';
import ComLink from './com-link';
import SvgTrust from './svg-trust';
import '../../../resources/dist/css/ln/modules/mod-trust.css';
import ComContainer from './com-container';

const ModTrust = props => {
    const { classesNames, classCondition, trustProject, size } = props;
    if (!trustProject) return null;

    return (
        <section
            className={`mod-trust ${size} ${classesNames ||
                ''} ${classCondition || ''}`}
        >
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
                link="https://www.lanacion.com.ar/tema/the-trust-project-tid68036/"
                size={size}
            >
                Conocé The Trust Project
            </ComLink>
        </section>
    );
};
ModTrust.propTypes = {
    trustProject: PropTypes.boolean.isRequired,
    size: PropTypes.string.isRequired,
    classesNames: PropTypes.string,
    classCondition: PropTypes.string
};

export default ModTrust;
