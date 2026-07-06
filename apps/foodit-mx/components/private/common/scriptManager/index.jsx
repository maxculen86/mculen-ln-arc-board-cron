import React from 'react';

export const ERRORS = {
    ARGUMENTS_COMPONENTS:
        'Debe especificar argumento components con lista de componentes a renderizar',
    ARGUMENTS_SETTINGS: 'Debe especificar argumento settings',
    PROPS: 'Debe especificar props: location o name'
};

export default (
    components,
    settings = {},
    globalContent = {},
    isArcPreview = false
) => {
    if (
        !components ||
        typeof components !== 'object' ||
        components instanceof Array ||
        Object.keys(components).length === 0
    )
        throw new Error(ERRORS.ARGUMENTS_COMPONENTS);

    return props => {
        const { location, name } = props;

        if (!(location || name)) throw new Error(ERRORS.PROPS);

        return Object.keys(components).reduce((acc, type) => {
            const {
                location: settingsLocation = [],
                props: componentProps = {}
            } = settings[type] || {};

            if (
                name === type ||
                (settingsLocation.indexOf(location) >= 0 &&
                    !(isArcPreview && componentProps?.excludeInArcPreview))
            ) {
                const Script = components[type];

                if (Script) {
                    acc.push(
                        <Script
                            key={type}
                            location={location}
                            {...componentProps}
                            globalContent={globalContent}
                        />
                    );
                }
            }

            return acc;
        }, []);
    };
};
