import React from 'react';

const Components = {};

export default (settings = {}) => props => {
    const { location } = props;

    const scripts = (settings || [])
        .map(script => {
            const { type, props: properties } = script;
            const Script = Components[type];

            if (!Script) return false;

            return <Script location={location} {...properties} />;
        })
        .filter(Boolean);

    return scripts;
};
