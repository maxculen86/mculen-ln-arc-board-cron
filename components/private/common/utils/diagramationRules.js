const diagramationRules = diagramation => {
    const diagramations = {
        aperturaFocalIzquierdo: [
            {
                titleTag: 'h1',
                subheadTag: 'h2'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            }
        ],
        aperturaPor4: [
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            }
        ],
        aperturaFocalCenter: [
            {
                titleTag: 'h1',
                subheadTag: 'h2'
            },
            {
                titleTag: 'h2'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                titleTag: 'h2'
            }
        ],
        aperturaFocalAl70: [
            {
                titleTag: 'h1',
                subheadTag: 'h2'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                titleTag: 'h2'
            }
        ]
    };
    return diagramations[diagramation];
};
export default diagramationRules;
