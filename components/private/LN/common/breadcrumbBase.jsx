import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../resources/dist/css/ln/components/breadcrumb.css';
import ModTooltip from '../../common/mod-tooltip';
import ComContainer from '../../common/com-container';
// import ComBullet from '../../common/com-bullet';

const getListSections = (sections, extraOpts, host, colorCategory) =>
    sections.map(section => {
        const path =
            section.name === 'LA NACION' && section.path === '/' && host
                ? host
                : section.path;
        return (
            <a
                className="com-link --threexs"
                key={path}
                href={`${path}/`}
                {...extraOpts}
                style={{ color: colorCategory, borderLeftColor: colorCategory }}
            >
                {section.name}
            </a>
        );
    });

const BreadcrumbBase = props => {
    const {
        sections,
        extraClasses,
        dataSection,
        lastLinked,
        host,
        tooltip,
        colorCategory = ''
    } = props;

    const extraOpts = {};

    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    let listSections = [];

    if (!lastLinked && sections.length) {
        let finalSections = sections;
        finalSections = finalSections.slice(0, finalSections.length - 1);
        listSections = getListSections(
            finalSections,
            extraOpts,
            host,
            colorCategory
        );
        const lastSection = sections.slice(
            sections.length - 1,
            sections.length
        )[0];
        listSections.push(
            <span
                className="com-text --threexs"
                key={lastSection.path}
                style={{
                    color: colorCategory,
                    borderLeftColor: colorCategory,
                    opacity: `.7`
                }}
            >
                {/* <div className="com-bullet"> */}
                <i
                    style={{
                        color: colorCategory,
                        borderLeftColor: colorCategory
                    }}
                    className="com-icon bullet icon-bullet --xs"
                />
                {/* </div> */}
                {lastSection.name}
            </span>
        );
    } else
        listSections = getListSections(
            sections,
            extraOpts,
            host,
            colorCategory
        );

    return (
        <nav className={`com-breadcrumb ${extraClasses || ''}`}>
            {listSections}
            {/* Último item */}
            {tooltip && (
                <span className="com-text --threexs --tooltip">
                    {/* <div className="com-bullet"> */}
                    <i
                        style={{
                            color: colorCategory,
                            borderLeftColor: colorCategory
                        }}
                        className="com-icon bullet icon-bullet --xs"
                    />
                    {/* </div> */}
                    {tooltip.text}
                    {tooltip.label && (
                        <ComContainer>
                            <ModTooltip label={tooltip.label} />
                        </ComContainer>
                    )}
                </span>
            )}
        </nav>
    );
};

BreadcrumbBase.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired,
    extraClasses: PropTypes.string,
    dataSection: PropTypes.string,
    colorCategory: PropTypes.string,
    lastLinked: PropTypes.boolean,
    host: PropTypes.string.isRequired,
    tooltip: PropTypes.shape({
        text: PropTypes.string,
        label: PropTypes.string
    })
};

BreadcrumbBase.defaultProps = {
    extraClasses: undefined,
    dataSection: undefined,
    tooltip: undefined,
    lastLinked: undefined,
    colorCategory: ''
};

export default BreadcrumbBase;
