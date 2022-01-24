import React from 'react';

import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

const ThemeBox = ({ id: idFeature, title, notes }) => {
    return (
        <section className="row mod-layout-articles">
            <div className="com-header">
                <h3 className="com-title">
                    <a href="/">{title}</a>
                </h3>
            </div>
            <div className="row-gap-tablet-3">{notes}</div>
        </section>
    );
};

ThemeBox.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    notes: PropTypes.arrayOf(PropTypes.node)
};

ThemeBox.defaultProps = {
    title: undefined,
    notes: undefined
};

export default Consumer(ThemeBox);
