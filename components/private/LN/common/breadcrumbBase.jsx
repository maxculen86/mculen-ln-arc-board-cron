import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../resources/dist/css/ln/components/breadcrumb.css';

const getListSections = (sections, extraOpts) =>
    sections.map(section => (
        <a key={section.path} href={section.path} {...extraOpts}>
            {section.name}
        </a>
    ));

const BreadcrumbBase = ({
    sections,
    extraClasses,
    dataSection,
    lastLinked
}) => {
    const extraOpts = {};
    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    let listSections = [];
    if (!lastLinked && sections.length) {
        let finalSections = sections;
        finalSections = finalSections.slice(0, finalSections.length - 1);
        listSections = getListSections(finalSections, extraOpts);
        const lastSection = sections.slice(
            sections.length - 1,
            sections.length
        )[0];
        listSections.push(
            <span key={lastSection.path}>{lastSection.name}</span>
        );
    } else listSections = getListSections(sections, extraOpts);
    return (
        <nav className={`com-breadcrumb ${extraClasses || ''}`}>
            {listSections}
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
    lastLinked: PropTypes.boolean
};

// BreadcrumbBase.defaultProps = {
//     extraClasses: undefined,
//     dataSection: undefined,
//     lastLinked: false
// };

export default BreadcrumbBase;
