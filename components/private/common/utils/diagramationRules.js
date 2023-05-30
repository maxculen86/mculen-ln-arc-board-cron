const diagramationRules = diagramation => {
    const img = {
        bottom: 'img-bottom',
        top: 'img-top',
        right: 'img-right',
        left: 'img-left',
        none: 'img-none'
    };
    const tag = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3'
    };
    const size = {
        XS: 'xs',
        S: 's',
        M: 'm',
        ML: 'm-l',
        L: 'l',
        XL: 'xl',
        XLL: 'xl-l',
        threeXL: '3xl',
        fourXL: '4xl',
        fiveXL: '5xl',
        sixXL: '6xl',
        T1: 'T1'
    };
    const author = 'author';
    const liveblog = 'liveblog';
    const html = 'html';
    const ranking = 'ranking';
    const txtCenter = '--txt-center';
    const tabTextCenter = '--tab-text-center';

    const diagramations = {
        'left-focal': [
            {
                titleTag: tag.h1,
                subheadTag: tag.h2,
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: true,
                cardSize: size.fourXL,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.bottom,
                    desktop: img.bottom
                },
                imageConfig: size.T1,
                withPreload: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: size.S
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: size.S
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                imagePosition: img.bottom,
                withSubhead: false,
                imageConfig: size.S
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: size.S
            }
        ],
        'center-focal': [
            {
                variantsDisabled: [author],
                titleTag: tag.h1,
                subheadTag: tag.h2,
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: true,
                withPreload: true,
                cardSize: size.fourXL,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.none,
                    desktop: img.none
                }
            },
            {
                variantsDisabled: ['liveblog'],
                titleTag: tag.h2,
                cardSize: size.XLL,
                imageConfig: size.T1,
                withSection: false,
                withPreload: true,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S
            },
            {
                variantsDisabled: [author],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                withSubheadAndMedia: false,
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.none,
                    desktop: img.none
                }
            }
        ],
        'focal-70': [
            {
                titleTag: tag.h1,
                subheadTag: tag.h2,
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: true,
                extraClass: { video: 'ln-70-video' },
                cardSize: size.fourXL,
                imageConfig: size.T1,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.right
                },
                withPreload: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                imageConfig: size.S,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false
            },
            {
                variantsDisabled: ['author'],
                titleTag: tag.h2,
                cardSize: size.ML,
                withSection: false,
                imageConfig: size.S,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                withSubheadAndMedia: false,
                withMedia: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.none
                }
            }
        ],
        'bn-opening-4': [
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.M,
                withSubhead: false,
                imageConfig: size.XS,
                withPreload: true,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                }
            }
        ],
        horizontal: [
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h1,
                subheadTag: tag.h2,
                withMedia: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSection: true,
                cardSize: size.sixXL,
                imageConfig: 'bombaHorizontal',
                aspectRatio: 'ar-picture',
                className: txtCenter,
                withPreload: true,
                extraClass: { withoutMedia: '--no-mc' }
            }
        ],
        vertical: [
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h1,
                subheadTag: tag.h2,
                withMedia: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSection: true,
                cardSize: size.sixXL,
                imageConfig: 'bombaVertical',
                aspectRatio: 'ar-square',
                className: txtCenter,
                withPreload: true
            }
        ],
        bombita: [
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: false,
                cardSize: size.fiveXL,
                className: txtCenter
            }
        ],
        bombitaMas4: [
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: false,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.fiveXL,
                className: txtCenter,
                hideBadget: true
            },
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.M,
                imageConfig: size.XS,
                hideBadget: true
            },
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.M,
                imageConfig: size.XS,
                hideBadget: true
            },
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.M,
                imageConfig: size.XS,
                hideBadget: true
            },
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.M,
                imageConfig: size.XS,
                hideBadget: true
            }
        ],
        bnGrilla4: [
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.T1
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            }
        ],
        bnGrilla8: [
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            }
        ],
        'ranking-1-2-2_grid': [
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                cardSize: size.L,
                imageConfig: size.S,
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.right
                },
                cardSize: size.M,
                imageConfig: ranking,
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.right
                },
                cardSize: size.M,
                imageConfig: ranking,
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.right
                },
                imageConfig: ranking,
                cardSize: size.M,
                withSubhead: false,
                withMarqueeImg: false
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.right
                },
                cardSize: size.M,
                imageConfig: size.M,
                withSubhead: false,
                withMarqueeImg: false
            }
        ],
        'hash-1-2-2-2_grid': [
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                className: tabTextCenter
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                className: tabTextCenter
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                className: tabTextCenter
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                className: tabTextCenter
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                className: tabTextCenter
            },
            {
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                className: tabTextCenter
            }
        ],
        bn_1_4_grid: [
            {
                variantsDisabled: [author],
                cardSize: size.threeXL,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                }
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            }
        ],
        bn_1_grid: [
            {
                variantsDisabled: [author],
                cardSize: size.threeXL,
                imageConfig: size.M,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                }
            }
        ],
        bn_2_grid: [
            {
                cardSize: size.M,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                }
            },
            {
                cardSize: size.M,
                imageConfig: size.S,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                }
            }
        ],
        canal_1_2_grid: [
            {
                variantsDisabled: [author],
                cardSize: size.threeXL,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.left
                }
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.M
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.M
            }
        ],
        canal_1_3_grid: [
            {
                cardSize: size.threeXL,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            }
        ],
        canal_1_4_grid: [
            {
                cardSize: size.threeXL,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.left,
                    desktop: img.left
                }
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.S
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            }
        ],
        bn_1_3_grid: [
            {
                variantsDisabled: [author],
                cardSize: size.threeXL,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.M
            }
        ],
        bn_1_2_grid: [
            {
                variantsDisabled: [author],
                cardSize: size.threeXL,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                }
            },
            {
                variantsDisabled: [],
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            },
            {
                variantsDisabled: [],
                imagePosition: {
                    mobile: img.right,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.XS
            }
        ],
        bn_1_1_grid: [
            {
                variantsDisabled: [author],
                cardSize: '2xl',
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: true,
                withSection: false,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                }
            },
            {
                variantsDisabled: [],
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.M
            }
        ],
        bn_2_1_2_grid: [
            {
                variantsDisabled: [liveblog, author],
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: true,
                cardSize: size.XL,
                imageConfig: size.T1,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                variantsDisabled: [liveblog, author],
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.none
                }
            },
            {
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.top,
                    desktop: img.top
                }
            },
            {
                variantsDisabled: [liveblog, author],
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: size.M,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.none
                }
            }
        ],
        bnFondo: [
            {
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                cardSize: size.threeXL,
                imageConfig: size.M,
                variantsDisabled: [author, liveblog],
                imagePosition: {
                    mobile: img.top,
                    tablet: img.left,
                    desktop: img.left
                }
            }
        ],
        opinion4: [
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: size.threeXL,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            }
        ],
        opinion8: [
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: size.threeXL,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.L,
                titleTag: tag.h2,
                subheadTag: tag.h3
            }
        ],
        cajaContent1: [
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: size.threeXL,
                imageConfig: size.M
            }
        ]
    };

    diagramations['bn-4-8'] = diagramations.bnGrilla4;

    return diagramations[diagramation];
};
export default diagramationRules;
