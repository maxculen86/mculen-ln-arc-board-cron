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
                variantsDisabled: ['author'],
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
                variantsDisabled: ['liveblog'],
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
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h1',
                subheadTag: 'h2',
                withMedia: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSection: true,
                cardSize: '5xl',
                aspectRatio: 'ar-picture',
                className: '--txt-center'
            }
        ],
        vertical: [
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h1',
                subheadTag: 'h2',
                withMedia: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSection: true,
                cardSize: '5xl',
                aspectRatio: 'ar-square',
                className: '--txt-center'
            }
        ],
        bombita: [
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: false,
                cardSize: '5xl',
                className: '--txt-center'
            }
        ],
        cajaContent1: [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true
            }
        ],
        bombitaMas4: [
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: false,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: '5xl',
                className: '--txt-center'
            },
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm'
            },
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
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
        'ranking-1-2-2_grid': [
            {
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                cardSize: 'l',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                cardSize: 'l',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                cardSize: 'l',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                cardSize: 'l',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                cardSize: 'l',
                withSubhead: false,
                withMarqueeImg: false
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
        ],
        canal_1_4_grid: [
            {
                cardSize: '4xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-left',
                    desktop: 'img-left'
                }
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
        bn_1_4_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '4xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-right',
                    desktop: 'img-right'
                }
            },
            {
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
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
                withMedia: true,
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
                withMedia: true,
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
                withMedia: true,
                withSubhead: false,
                cardSize: 'm'
            }
        ],
        bn_1_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '4xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-right',
                    desktop: 'img-right'
                }
            }
        ],
        bn_2_grid: [
            {
                cardSize: 'm',
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                }
            },
            {
                cardSize: 'm',
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                }
            }
        ],
        canal_1_3_grid: [
            {
                cardSize: '3xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            }
        ],
        bn_1_3_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '3xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            }
        ],
        bn_1_2_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '4xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-right',
                    desktop: 'img-right'
                }
            },
            {
                variantsDisabled: [],
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                variantsDisabled: [],
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            }
        ],
        canal_1_2_grid: [
            {
                cardSize: '4xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-right',
                    desktop: 'img-left'
                }
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-right',
                    desktop: 'img-right'
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm'
            }
        ],
        bn_1_1_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '3xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-right',
                    desktop: 'img-right'
                }
            },
            {
                variantsDisabled: [],
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
        bn_2_1_2_grid: [
            {
                variantsDisabled: ['liveblog', 'author'],
                withSection: false,
                withMarquee: false,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: 'xl',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                withSection: false,
                withMarquee: false,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                variantsDisabled: ['liveblog', 'author'],
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-none'
                }
            },
            {
                withSection: false,
                withMarquee: false,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                variantsDisabled: ['liveblog', 'author'],
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-none'
                }
            }
        ],
        bnFondo: [
            {
                withSection: false,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: false,
                cardSize: 'xl',
                variantsDisabled: ['author', 'liveblog'],
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-left',
                    desktop: 'img-left'
                }
            }
        ]
    };

    diagramations['bn-4-8'] = diagramations.bnGrilla4;

    return diagramations[diagramation];
};
export default diagramationRules;
