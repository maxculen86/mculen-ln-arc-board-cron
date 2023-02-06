const diagramationRules = diagramation => {
    const diagramations = {
        'left-focal': [
            {
                titleTag: 'h1',
                subheadTag: 'h2',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: true,
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
                withMarqueeImg: false,
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                imagePosition: 'img-bottom',
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false
            }
        ],
        'bn-opening-4': [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'l',
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
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
                withSubhead: false,
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
                withSubhead: false,
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
                withSubhead: true,
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
                withMarqueeImg: false,
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'l'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
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
                withSubhead: true,
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
                withMarqueeImg: false,
                withSubhead: false
            },
            {
                titleTag: 'h2',
                cardSize: 'l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-none'
                }
            }
        ],
        horizontal: [
            {
                titleTag: 'h1',
                subheadTag: 'h2',
                withImage: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                cardSize: '5xl',
                aspectRatio: 'ar-picture'
            }
        ],
        vertical: [
            {
                titleTag: 'h1',
                subheadTag: 'h2',
                withImage: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                cardSize: '5xl',
                aspectRatio: 'ar-square'
            }
        ],
        bombita: [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                withImage: false
            }
        ],
        bombitaMas4: [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withImage: false,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: '5xl'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withImage: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withImage: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withImage: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withImage: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            }
        ],
        bn_2_1_2_grid: [
            {
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-none'
                }
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-none'
                }
            }
        ]
    };
    return diagramations[diagramation];
};
export default diagramationRules;
