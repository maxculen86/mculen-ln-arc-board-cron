const diagramationRules = diagramation => {
    // TODO: Guardar en una variable configuraciones que sean iguales para no repetir codigo.
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
                imageConfig: 'T1',
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
                imageConfig: 's'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'm-l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: 's'
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
                imageConfig: 's'
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                cardSize: 'm-l',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: 's'
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
                imageConfig: 's',
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
                imageConfig: 'T1',
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
                cardSize: 'm',
                imageConfig: 's'
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
                cardSize: 'm',
                imageConfig: 's',
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
                imageConfig: 'T1',
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
                cardSize: 'm',
                imageConfig: 's',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false
            },
            {
                variantsDisabled: ['author'],
                titleTag: 'h2',
                cardSize: 'm',
                withSection: false,
                imageConfig: 's',
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
        'bn-opening-4': [
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: 'm',
                withSubhead: false,
                imageConfig: 'xs',
                withPreload: true
            },
            {
                titleTag: 'h2',
                subheadTag: 'h3',
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: 'm',
                imageConfig: 'xs',
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
                cardSize: 'm',
                imageConfig: 'xs',
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
                cardSize: 'm',
                imageConfig: 'xs',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
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
                imageConfig: 'bombaHorizontal',
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
                imageConfig: 'bombaVertical',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'T1'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 's'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 's'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 's',
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
                imageConfig: 'ranking',
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
                imageConfig: 'ranking',
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-none',
                    desktop: 'img-right'
                },
                imageConfig: 'ranking',
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
                imageConfig: 's',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
                imagePosition: {
                    mobile: 'img-right',
                    tablet: 'img-top',
                    desktop: 'img-top'
                },
                className: '--tab-text-center'
            }
        ],
        bn_1_4_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '3xl',
                imageConfig: 'T1',
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
                imageConfig: 's'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
            }
        ],
        bn_1_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '3xl',
                imageConfig: 'm',
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
                imageConfig: 'T1',
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
                imageConfig: 's',
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
        canal_1_2_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '3xl',
                imageConfig: 'T1',
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
        canal_1_3_grid: [
            {
                cardSize: '3xl',
                imageConfig: 'T1',
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
            }
        ],
        canal_1_4_grid: [
            {
                cardSize: '3xl',
                imageConfig: 'T1',
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
                imageConfig: 's'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
            }
        ],
        bn_1_3_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '3xl',
                imageConfig: 'T1',
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
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
                cardSize: '3xl',
                imageConfig: 'T1',
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
                imageConfig: 'xs'
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
                imageConfig: 'xs'
            }
        ],
        bn_1_1_grid: [
            {
                variantsDisabled: ['author'],
                cardSize: '2xl',
                imageConfig: 'T1',
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: true,
                withSection: false,
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
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: 'xl',
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'T1',
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
                imageConfig: 'xs',
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
                imageConfig: 'xs',
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
                imageConfig: 'm',
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
                cardSize: '3xl',
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
                cardSize: '3xl',
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
        ]
    };

    diagramations['bn-4-8'] = diagramations.bnGrilla4;

    return diagramations[diagramation];
};
export default diagramationRules;
