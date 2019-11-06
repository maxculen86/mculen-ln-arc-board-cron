'use strict';

import React from 'react';

export default ({ onClick }) => {
    return (
        <button
            className="icon-android"
            id="pie-android"
            target="_blank"
            onClick={onClick}
        />
    );
};
