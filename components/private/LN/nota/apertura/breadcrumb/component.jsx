import React, { Fragment } from 'react';

export default props => {
    const { sections } = props;
    const listSections = sections.map((section, index) => {
        return (
            <Fragment key={index}>
                <strong className={section.type}>
                    <a href={section.path}>{section.name}</a>
                </strong>
                {index !== sections.length - 1 && <span> | </span>}
            </Fragment>
        );
    });

    return <div className="breadcrumb">{listSections}</div>;
};
