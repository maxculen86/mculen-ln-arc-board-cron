import React from 'react';

export default (components, settings) => {
    if (
        !components ||
        typeof components !== 'object' ||
        components instanceof Array
    )
        throw new Error(
            'Debe especificar argumento components con lista de componentes a renderizar'
        );

    if (!settings) throw new Error('Debe especificar argumento settings');

    return props => {
        const { location, name } = props;

        if (!(location || name))
            throw new Error('Debe especificar props: location o name');

        const scripts = settings
            .filter(({ type }) => !name || name === type)
            .map(script => {
                const { type, props: properties } = script;
                const Script = components[type];

                if (!Script) return false;

                return <Script location={location} {...properties} />;
            })
            .filter(Boolean);

        return scripts;
    };
};
