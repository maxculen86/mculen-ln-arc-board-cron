const diagramationRules = diagramation => {
    const diagramations = {
        'left-focal': [
            {
                titleTag: 'h1',
                subheadTag: 'h2',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                cardSize: '4xl',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-bottom',
                    desktop: 'img-bottom'
                }
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                imagePosition: 'img-bottom'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false
            }
        ],
        'bn-opening-4': [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'l'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'l',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: true,
                cardSize: 'l',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'l',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            }
        ],
        'center-focal': [
            {
                titleTag: 'h1',
                subheadTag: 'h2',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                cardSize: '5xl',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-none',
                    desktop: 'img-none'
                }
            },
            {
                titleTag: 'h2',
                cardSize: 'xl',
                withSection: false,
                withMarquee: false,
                withMarqueeImg: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'l'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'l',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-none',
                    desktop: 'img-none'
                }
            }
        ],
        'focal-70': [
            {
                titleTag: 'h1',
                subheadTag: 'h2',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                cardSize: '4xl',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-right'
                }
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'l',
                withSection: false,
                withMarquee: false,
                withMarqueeImg: false
            },
            {
                titleTag: 'h2',
                cardSize: 'l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-none'
                }
            }
        ]
    };
    return diagramations[diagramation];
};
export default diagramationRules;
