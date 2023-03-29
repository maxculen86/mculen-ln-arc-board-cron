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
                },
                imageConfig: 'xxl',
                withPreload: true
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'm-l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: 'xl'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'm-l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: 'xl'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'm-l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                imagePosition: 'img-bottom',
                withSubhead: false,
                imageConfig: 'xl'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'm-l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: 'xl'
            }
        ],
        'bn-opening-4': [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'l-m',
                withSubhead: false,
                imageConfig: 'l',
                withPreload: true,
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
                cardSize: 'l-m',
                imageConfig: 'l',
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
                cardSize: 'l-m',
                imageConfig: 'l',
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
                cardSize: 'l-m',
                imageConfig: 'l',
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
                cardSize: '4xl',
                imageConfig: 'xxl',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-none',
                    desktop: 'img-none'
                }
            },
            {
                variantsDisabled: ['liveblog'],
                titleTag: 'h2',
                cardSize: 'xl-l',
                imageConfig: 'xl',
                withPreload: true,
                withSection: false,
                withMarquee: true,
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
                cardSize: 'l',
                imageConfig: 'l'
            },
            {
                variantsDisabled: ['author'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                withSubheadAndMedia: false,
                withMedia: true,
                cardSize: 'l',
                imageConfig: 'l',
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
                imageConfig: 'xxl',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-right'
                },
                withPreload: true
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'xl-l',
                imageConfig: 'l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false
            },
            {
                variantsDisabled: ['author'],
                titleTag: 'h2',
                cardSize: 'l-m',
                withSection: false,
                imageConfig: 'l',
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                withSubheadAndMedia: false,
                withMedia: true,
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
                cardSize: '6xl',
                imageConfig: 'xxl',
                aspectRatio: 'ar-picture',
                className: '--txt-center',
                withPreload: true,
                extraClass: { withoutMedia: '--no-mc' }
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
                cardSize: '6xl',
                imageConfig: 'xxl',
                aspectRatio: 'ar-square',
                className: '--txt-center',
                withPreload: true
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
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: '3xl',
                imageConfig: 'm'
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
                className: '--txt-center',
                hideBadget: true
            },
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm',
                imageConfig: 'm',
                hideBadget: true
            },
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm',
                imageConfig: 'm',
                hideBadget: true
            },
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm',
                imageConfig: 'm',
                hideBadget: true
            },
            {
                variantsDisabled: ['author', 'liveblog', 'html'],
                titleTag: 'h2',
                subheadTag: 'h3',
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm',
                imageConfig: 'm',
                hideBadget: true
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
                cardSize: 'm-l',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm-l',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm-l',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                imageConfig: 'l',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                cardSize: 'm',
                imageConfig: 'm',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                cardSize: 'm',
                imageConfig: 'm',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                imageConfig: 'm',
                cardSize: 'm',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                cardSize: 'm',
                imageConfig: 'm',
                withSubhead: false,
                withMarqueeImg: false
            }
        ],
        'hash-1-2-2-2_grid': [
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm',
                imageConfig: 'l',
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
                cardSize: 'm',
                imageConfig: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                className: '--tab-text-center'
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm',
                imageConfig: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                className: '--tab-text-center'
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm',
                imageConfig: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                className: '--tab-text-center'
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm',
                imageConfig: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                className: '--tab-text-center'
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm',
                imageConfig: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                className: '--tab-text-center'
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm',
                imageConfig: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                className: '--tab-text-center'
            }
        ],
        canal_1_4_grid: [
            {
                cardSize: '3xl',
                imageConfig: 'xl',
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
            }
        ],
        bn_1_4_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '4xl',
                imageConfig: 'xl',
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
                cardSize: 'm-l',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
            }
        ],
        bn_1_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '4xl',
                imageConfig: 'xl',
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
                imageConfig: 'm',
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
                imageConfig: 'm',
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
                imageConfig: 'xl',
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
            }
        ],
        bn_1_3_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '3xl',
                imageConfig: 'xl',
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
            }
        ],
        bn_1_2_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '4xl',
                imageConfig: 'xxl',
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
            }
        ],
        canal_1_2_grid: [
            {
                cardSize: '4xl',
                imageConfig: 'xxl',
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
                cardSize: 'm',
                imageConfig: 'm'
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
                cardSize: 'm',
                imageConfig: 'm'
            }
        ],
        bn_1_1_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '3xl',
                imageConfig: 'xl',
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: false,
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
                cardSize: 'm',
                imageConfig: 'm'
            }
        ],
        bn_2_1_2_grid: [
            {
                variantsDisabled: ['liveblog', 'author'],
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: 'xl',
                imageConfig: 'xl',
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-top',
                    desktop: 'img-top'
                }
            },
            {
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: 'm',
                imageConfig: 'm',
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
                imageConfig: 'm',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-none'
                }
            },
            {
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: 'm',
                imageConfig: 'm',
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
                imageConfig: 'm',
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
                cardSize: '3xl',
                imageConfig: 'xl',
                variantsDisabled: ['author', 'liveblog'],
                imagePosition: {
                    mobile: 'img-top',
                    tablet: 'img-left',
                    desktop: 'img-left'
                }
            }
        ],
        opinion4: [
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: '2xl',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            }
        ],
        opinion8: [
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: '2xl',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: 'l',
                titleTag: 'h2',
                subheadTag: 'h3'
            }
        ]
    };

    diagramations['bn-4-8'] = diagramations.bnGrilla4;

    return diagramations[diagramation];
};
export default diagramationRules;
