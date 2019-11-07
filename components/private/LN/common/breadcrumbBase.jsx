import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../resources/dist/css/ln/components/breadcrumb.css';

const getListSections = (sections, extraOpts, host) =>
    sections.map(section => {
        const path =
            section.name === 'LA NACION' && section.path === '/'
                ? host
                : section.path;
        console.log('TCL: getListSections -> path', path);
        console.log('TCL: getListSections -> section', section);
        return (
            <a key={path} href={path} {...extraOpts}>
                {section.name}
            </a>
        );
    });

const BreadcrumbBase = ({
    sections,
    extraClasses,
    dataSection,
    lastLinked,
    host
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
        listSections = getListSections(finalSections, extraOpts, host);
        const lastSection = sections.slice(
            sections.length - 1,
            sections.length
        )[0];
        listSections.push(
            <span key={lastSection.path}>{lastSection.name}</span>
        );
    } else listSections = getListSections(sections, extraOpts, host);
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
    lastLinked: PropTypes.boolean,
    host: PropTypes.string.isRequired
};

// BreadcrumbBase.defaultProps = {
//     extraClasses: undefined,
//     dataSection: undefined,
//     lastLinked: false
// };

export default BreadcrumbBase;
