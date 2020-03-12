import React from 'react';
import PropTypes from 'fusion:prop-types';

const ThemeBox = ({ title, notes }) => {
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
    title: PropTypes.string,
    notes: PropTypes.arrayOf(PropTypes.node)
};

ThemeBox.defaultProps = {
    title: undefined,
    notes: undefined
};

export default ThemeBox;
