'use strict';

import React from 'react';
export default ({ onClickEvent }) => {
    return (
        <button
            className="icon-android"
            id="pie-android"
            target="_blank"
            onClick={onClickEvent}
        />
    );
};
