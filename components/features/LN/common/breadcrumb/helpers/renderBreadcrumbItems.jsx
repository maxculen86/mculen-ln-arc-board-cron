import React from 'react';
import mapSectionsToLinks from './mapSectionsToLinks';

const renderBreadcrumbItems = ({ sections, lastLinked, extraOpts, host }) => {
    if (!lastLinked && sections.length) {
        const finalSections = sections.slice(0, sections.length - 1);
        const listSections = mapSectionsToLinks(finalSections, extraOpts, host);

        const lastSection = sections[sections.length - 1];

        listSections.push(
            <span className="com-text --fourxs" key={lastSection.path}>
                <i className="--bullet --fourxs">{`>`}</i>
                {lastSection.name}
            </span>
        );

        return listSections;
    }

    return mapSectionsToLinks(sections, extraOpts, host);
};

export default renderBreadcrumbItems;
