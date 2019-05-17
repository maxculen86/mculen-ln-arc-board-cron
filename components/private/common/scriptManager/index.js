import React from 'react';
import GTM from './googleTagManager';
import Comscore from './comscore';

const Components = { GTM, Comscore };

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
