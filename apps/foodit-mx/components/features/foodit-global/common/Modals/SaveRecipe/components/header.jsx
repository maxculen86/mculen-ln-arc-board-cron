import React from 'react';

function HeaderSaveRecipe({ title }) {
    return (
        <header>
            <h2 className="prumo prumo-semibold text-24 text-28_md text-32_lg">
                {title}
            </h2>
        </header>
    );
}

export default HeaderSaveRecipe;
