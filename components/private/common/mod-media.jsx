import React from 'react';

//import '../../../resources/dist/css/ln/modules/mod-media.css';

const ModMedia = props => {
    const { children, classCondition, withZoom, active, media } = props;
    return (
        <section
            className={`mod-media ${withZoom || ''} ${classCondition || ''}`}
        >
            {children}
        </section>
    );
};

export default ModMedia;
