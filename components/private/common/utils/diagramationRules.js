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
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                imagePosition: 'img-bottom',
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: false
            }
        ],
        'bn-opening-4': [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                cardSize: 'l',
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: true,
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
                withSection: true,
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
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
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
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: false
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: false,
                cardSize: 'l'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: false,
                withSubheadAndMedia: false,
                withMedia: false,
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
                extraClass: { video: 'ln-70-video' },
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
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: false
            },
            {
                titleTag: 'h2',
                cardSize: 'l',
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: false,
                withSubheadAndMedia: false,
                withMedia: false,
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
                withMedia: true,
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
                withMedia: true,
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
                withMedia: false
            }
        ],
        bombitaMas4: [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: false,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: '5xl'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            }
        ],
        bnGrilla4: [
            {
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            }
        ],
        bnGrilla8: [
            {
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            }
        ],
        'hash-1-2-2-2_grid': [
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'l',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                withMarquee: false,
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
                withMarquee: false,
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
                withMarquee: false,
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
                withMarquee: false,
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
                withMarquee: false,
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
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'l',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            }
        ]
    };
    return diagramations[diagramation];
};
export default diagramationRules;
