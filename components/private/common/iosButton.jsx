'use strict';

import React from 'react';

export default ({ onClick }) => {
    return (
        <button
            className="icon-ios"
            id="pie-apple"
            onClick={onClick}
            target="_blank"
        />
    );
};
