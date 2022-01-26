import React from 'react';

export const ERRORS = {
    ARGUMENTS_COMPONENTS:
        'Debe especificar argumento components con lista de componentes a renderizar',
    ARGUMENTS_SETTINGS: 'Debe especificar argumento settings',
    PROPS: 'Debe especificar props: location o name'
};

export default (components, settings = {}, globalContent = {}) => {
    if (
        !components ||
        typeof components !== 'object' ||
        components instanceof Array ||
        Object.keys(components).length === 0
    )
        throw new Error(ERRORS.ARGUMENTS_COMPONENTS);

    const componentsName = Object.keys(components);

    return props => {
        const { location, name } = props;

        if (!(location || name)) throw new Error(ERRORS.PROPS);

        return componentsName
            .filter(
                type =>
                    name === type ||
                    ((settings[type] || {}).location || []).indexOf(location) >=
                        0
            )
            .map(type => {
                const { props: properties } = settings[type] || {};
                const Script = components[type];

                if (!Script) return false;

                return (
                    <Script
                        location={location}
                        {...properties}
                        globalContent={globalContent}
                    />
                );
            })
            .filter(Boolean);
    };
};
