import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import ComImage from './com-image';
import ComShield from './com-shield';
import ModheaderSection from './mod-headerSection';

const ModShield = props => {
    const { title, src, link, size, line } = props;
    if (!title && !src) return null;
    return (
        <section className="mod-image --shields">
            <ModheaderSection line size={size} title={title} />
            <ComShield src={src} link={link} />
        </section>
    );
};

export default ModShield;
