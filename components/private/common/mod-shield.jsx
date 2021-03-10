import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import ComImage from './com-image';
import ComShield from './com-shield';
import ModheaderSection from './mod-headerSection';

const ModShield = props => {
    const { title, src, link, size, line, children } = props;
    if (!title && !src) return null;
    return (
        <section className="mod-image --shields">
            <div className="sports">
                <ModheaderSection line size={size} title={title} />
                {children}
            </div>
        </section>
    );
};

export default ModShield;
