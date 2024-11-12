import React from 'react';
import PropTypes from 'fusion:prop-types';

function HeaderSaveRecipe({ title }) {
    return (
        <header className="border border-bottom border-thin border-light-100">
            <h2 className="prumo prumo-semibold text-24 text-28_md text-32_lg">
                {title}
            </h2>
        </header>
    );
}

HeaderSaveRecipe.propTypes = {
    title: PropTypes.string.isRequired
};

export default HeaderSaveRecipe;
