export const size = {
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
    T1: 'T1',
    T1Focal100: 'T1Focal100'
};

const CENTER_TEXT_CLASS = '--txt-center';

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

    const createImagePosition = (mobile, tablet, desktop) => ({
        mobile,
        tablet,
        desktop
    });

    const imagePositions = {
        top: createImagePosition(img.top, img.top, img.top),
        topBottom: createImagePosition(img.top, img.bottom, img.bottom),
        topRight: createImagePosition(img.top, img.right, img.right),
        topLeft: createImagePosition(img.top, img.left, img.left),
        topNone: createImagePosition(img.top, img.none, img.none),
        topDesktopRight: createImagePosition(img.top, img.top, img.right),
        topDesktopNone: createImagePosition(img.top, img.top, img.none),
        topRightLeft: createImagePosition(img.top, img.right, img.left),
        rightNone: createImagePosition(img.right, img.none, img.right)
    };

    const variantsDisabledByType = {
        author: ['author'],
        liveblog: ['liveblog'],
        authorLiveblog: ['author', 'liveblog'],
        authorLiveblogHtml: ['author', 'liveblog', 'html'],
        liveblogAuthor: ['liveblog', 'author']
    };

    const leadCardDefaults = {
        withSection: true,
        withMarquee: true,
        withMarqueeImg: true,
        withSubhead: true,
        cardSize: size.fourXL,
        withPreload: false,
        isLoadWithPicture: true,
        isCustomVoiceCandidate: true
    };

    const standardCardDefaults = {
        withSection: false,
        withMarquee: true,
        withMarqueeImg: false,
        withSubhead: false,
        cardSize: size.ML,
        imageConfig: size.S,
        isLoadWithPicture: true
    };

    const gridCardDefaults = {
        withMarquee: true,
        withMarqueeImg: false,
        withSubhead: false,
        cardSize: size.ML,
        imageConfig: size.XS,
        imagePosition: imagePositions.top,
        isLoadWithPicture: true
    };

    const opinionCardDefaults = {
        withMarquee: true,
        withMarqueeImg: true,
        titleTag: tag.h2,
        subheadTag: tag.h3,
        withMedia: false,
        cardSize: size.M,
        isLoadWithPicture: true
    };

    const hashCardDefaults = {
        withMarquee: false,
        withMarqueeImg: false,
        withSubhead: false,
        className: CENTER_TEXT_CLASS,
        cardSize: size.ML,
        imageConfig: size.XS,
        imagePosition: imagePositions.top,
        isLoadWithPicture: true
    };

    const setArticleSettings = (defaults, overrides = {}) => ({
        ...defaults,
        ...overrides
    });

    const repeat = (count, factory) =>
        Array.from({ length: count }, () => factory());

    const createTimelineCard = type =>
        setArticleSettings(standardCardDefaults, {
            type,
            titleTag: tag.h2,
            subheadTag: tag.h3,
            imagePosition: imagePositions.top,
            withPreload: false
        });

    const createBnPlayerCard = (type, overrides = {}) =>
        setArticleSettings(standardCardDefaults, {
            type,
            ...overrides
        });

    const diagramations = {
        'left-focal': [
            setArticleSettings(leadCardDefaults, {
                titleTag: tag.h1,
                subheadTag: tag.h2,
                imageConfig: size.T1,
                imagePosition: imagePositions.topBottom,
                withPreload: true
            }),
            setArticleSettings(standardCardDefaults, {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withPreload: true,
                isFetchPriorityHigh: true
            }),
            setArticleSettings(standardCardDefaults, {
                titleTag: tag.h2,
                subheadTag: tag.h3
            }),
            setArticleSettings(standardCardDefaults, {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                imagePosition: img.bottom
            }),
            setArticleSettings(standardCardDefaults, {
                titleTag: tag.h2,
                subheadTag: tag.h3
            })
        ],
        'center-focal': [
            setArticleSettings(leadCardDefaults, {
                variantsDisabled: variantsDisabledByType.author,
                titleTag: tag.h1,
                subheadTag: tag.h2,
                imageConfig: size.S,
                imagePosition: imagePositions.topNone,
                withPreload: true
            }),
            setArticleSettings(standardCardDefaults, {
                variantsDisabled: variantsDisabledByType.liveblog,
                titleTag: tag.h2,
                cardSize: size.XLL,
                imageConfig: size.T1,
                withPreload: true,
                isFetchPriorityHigh: true
            }),
            setArticleSettings(standardCardDefaults, {
                titleTag: tag.h2,
                subheadTag: tag.h3
            }),
            setArticleSettings(standardCardDefaults, {
                variantsDisabled: variantsDisabledByType.author,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSubheadAndMedia: false,
                withMedia: true,
                imagePosition: imagePositions.topNone
            })
        ],
        'focal-70': [
            setArticleSettings(leadCardDefaults, {
                extraClass: { video: 'ln-70-video' },
                titleTag: tag.h1,
                subheadTag: tag.h2,
                imageConfig: size.T1,
                imagePosition: imagePositions.topDesktopRight,
                withPreload: true
            }),
            setArticleSettings(standardCardDefaults, {
                titleTag: tag.h2,
                subheadTag: tag.h3
            }),
            setArticleSettings(standardCardDefaults, {
                variantsDisabled: variantsDisabledByType.author,
                titleTag: tag.h2,
                withSubheadAndMedia: false,
                withMedia: true,
                imagePosition: imagePositions.topDesktopNone
            })
        ],
        'focal-100': [
            setArticleSettings(leadCardDefaults, {
                cardSize: size.sixXL,
                titleTag: tag.h1,
                subheadTag: tag.h2,
                imageConfig: size.T1Focal100,
                imagePosition: imagePositions.topRight,
                withPreload: true
            })
        ],
        'left-focal-without-timeline': [
            setArticleSettings(leadCardDefaults, {
                type: 'T1',
                titleTag: tag.h1,
                subheadTag: tag.h2,
                imageConfig: size.T1,
                imagePosition: imagePositions.topBottom,
                withPreload: true
            }),
            setArticleSettings(standardCardDefaults, {
                type: 'T2',
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: true,
                imagePosition: imagePositions.top,
                withPreload: true,
                isFetchPriorityHigh: true
            }),
            ...['T3', 'T4', 'T5', 'T6'].map(createTimelineCard)
        ],
        bn_player_3_grid: [
            { type: 'T1' },
            createBnPlayerCard('T2', {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: true,
                cardSize: size.L,
                imagePosition: imagePositions.topRight,
                withPreload: true
            }),
            createBnPlayerCard('T3', {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                imagePosition: imagePositions.top,
                withPreload: false
            }),
            createBnPlayerCard('T4', {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                imagePosition: imagePositions.top,
                withPreload: false
            })
        ],
        bn_player_4_grid: [
            { type: 'T1' },
            createBnPlayerCard('T2', {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: true,
                imagePosition: imagePositions.topRight,
                withPreload: true
            }),
            ...['T3', 'T4', 'T5'].map(type =>
                createBnPlayerCard(type, {
                    titleTag: tag.h2,
                    subheadTag: tag.h3,
                    imagePosition: imagePositions.topRight,
                    withPreload: false
                })
            )
        ],
        'bn-opening-4': [
            setArticleSettings(standardCardDefaults, {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withPreload: true,
                imagePosition: imagePositions.top
            }),
            ...repeat(3, () =>
                setArticleSettings(standardCardDefaults, {
                    titleTag: tag.h2,
                    subheadTag: tag.h3,
                    imagePosition: imagePositions.top
                })
            )
        ],
        horizontal: [
            setArticleSettings(leadCardDefaults, {
                variantsDisabled: variantsDisabledByType.authorLiveblogHtml,
                cardSize: size.sixXL,
                titleTag: tag.h1,
                subheadTag: tag.h2,
                imageConfig: 'bombaHorizontal',
                aspectRatio: 'ratio-3-2',
                className: CENTER_TEXT_CLASS,
                extraClass: { withoutMedia: '--no-mc' },
                withMedia: true,
                withPreload: true
            })
        ],
        vertical: [
            setArticleSettings(leadCardDefaults, {
                variantsDisabled: variantsDisabledByType.authorLiveblogHtml,
                cardSize: size.sixXL,
                titleTag: tag.h1,
                subheadTag: tag.h2,
                imageConfig: 'bombaVertical',
                aspectRatio: 'ratio-3-4',
                className: CENTER_TEXT_CLASS,
                withMedia: true,
                withPreload: true
            })
        ],
        bombita: [
            {
                variantsDisabled: variantsDisabledByType.authorLiveblogHtml,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: false,
                cardSize: size.fiveXL,
                className: CENTER_TEXT_CLASS
            }
        ],
        bombitaMas4: [
            {
                variantsDisabled: variantsDisabledByType.authorLiveblogHtml,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: false,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.fiveXL,
                className: CENTER_TEXT_CLASS,
                hideBadget: false
            },
            ...repeat(4, () =>
                setArticleSettings(standardCardDefaults, {
                    titleTag: tag.h2,
                    subheadTag: tag.h3,
                    variantsDisabled: variantsDisabledByType.authorLiveblogHtml,
                    withMedia: true,
                    imageConfig: size.XS,
                    hideBadget: false
                })
            )
        ],
        bnGrilla4: repeat(4, () => setArticleSettings(gridCardDefaults)),
        bn_6_timeline: repeat(6, () => setArticleSettings(gridCardDefaults)),
        bnGrilla8: [
            setArticleSettings(gridCardDefaults, {
                imageConfig: size.S
            }),
            ...repeat(3, () => setArticleSettings(gridCardDefaults)),
            setArticleSettings(gridCardDefaults, {
                imageConfig: size.S
            }),
            ...repeat(3, () => setArticleSettings(gridCardDefaults))
        ],
        'ranking-1-2-2_grid': [
            {
                imagePosition: imagePositions.top,
                cardSize: size.L,
                imageConfig: size.S,
                withSubhead: false,
                withMarqueeImg: false,
                isLoadWithPicture: true
            },
            ...repeat(3, () => ({
                imagePosition: imagePositions.rightNone,
                cardSize: size.M,
                imageConfig: 'ranking',
                withSubhead: false,
                withMarqueeImg: false,
                isLoadWithPicture: true
            })),
            {
                imagePosition: imagePositions.rightNone,
                cardSize: size.M,
                imageConfig: size.M,
                withSubhead: false,
                withMarqueeImg: false,
                isLoadWithPicture: true
            }
        ],
        'hash-1-2-2-2_grid': [
            setArticleSettings(hashCardDefaults, {
                cardSize: size.M,
                imageConfig: size.S
            }),
            ...repeat(6, () => setArticleSettings(hashCardDefaults))
        ],
        bn_1_4_grid: [
            setArticleSettings(leadCardDefaults, {
                cardSize: size.threeXL,
                variantsDisabled: variantsDisabledByType.author,
                imageConfig: size.T1,
                withMedia: true,
                imagePosition: imagePositions.topRight
            }),
            ...repeat(4, () =>
                setArticleSettings(gridCardDefaults, {
                    withMedia: true
                })
            )
        ],
        bn_player_horizontal: [
            setArticleSettings(leadCardDefaults, {
                type: 'T1',
                variantsDisabled: variantsDisabledByType.author,
                cardSize: size.XLL,
                imageConfig: size.T1,
                withMedia: true,
                isLoadWithPicture: false
            })
        ],
        bn_1_grid: [
            setArticleSettings(leadCardDefaults, {
                cardSize: size.threeXL,
                variantsDisabled: variantsDisabledByType.author,
                imageConfig: size.T1,
                withMedia: true,
                imagePosition: imagePositions.topRight
            })
        ],
        bn_2_grid: [
            setArticleSettings(standardCardDefaults, {
                imageConfig: size.T1,
                withMedia: true,
                imagePosition: imagePositions.topRight
            }),
            setArticleSettings(standardCardDefaults, {
                withMedia: true,
                imageConfig: size.S,
                imagePosition: imagePositions.topRight
            })
        ],
        bn_3_grid: repeat(3, () =>
            setArticleSettings(standardCardDefaults, {
                withMedia: true,
                imageConfig: size.XS,
                imagePosition: imagePositions.top,
                isLoadWithPicture: false
            })
        ),
        canal_1_2_grid: [
            setArticleSettings(leadCardDefaults, {
                cardSize: size.threeXL,
                variantsDisabled: variantsDisabledByType.author,
                imageConfig: size.T1,
                withMedia: true,
                imagePosition: imagePositions.topRightLeft,
                isCustomVoiceCandidate: false
            }),
            ...repeat(2, () =>
                setArticleSettings(standardCardDefaults, {
                    imageConfig: size.M,
                    imagePosition: imagePositions.topRight
                })
            )
        ],
        canal_1_3_grid: [
            setArticleSettings(leadCardDefaults, {
                cardSize: size.threeXL,
                imageConfig: size.T1,
                withMedia: true,
                imagePosition: imagePositions.top,
                isCustomVoiceCandidate: false
            }),
            ...repeat(3, () =>
                setArticleSettings(standardCardDefaults, {
                    imageConfig: size.M,
                    imagePosition: imagePositions.topRight
                })
            )
        ],
        canal_1_4_grid: [
            setArticleSettings(leadCardDefaults, {
                cardSize: size.threeXL,
                imageConfig: size.T1,
                withMedia: true,
                imagePosition: imagePositions.topLeft,
                isCustomVoiceCandidate: false
            }),
            ...repeat(4, () => setArticleSettings(gridCardDefaults))
        ],
        bn_1_3_grid: [
            setArticleSettings(leadCardDefaults, {
                cardSize: size.threeXL,
                variantsDisabled: variantsDisabledByType.author,
                imageConfig: size.T1,
                withMedia: true,
                imagePosition: imagePositions.top
            }),
            ...repeat(3, () =>
                setArticleSettings(standardCardDefaults, {
                    imageConfig: size.M,
                    imagePosition: imagePositions.topRight
                })
            )
        ],
        bn_1_2_grid: [
            setArticleSettings(leadCardDefaults, {
                cardSize: size.threeXL,
                variantsDisabled: variantsDisabledByType.author,
                imageConfig: size.T1,
                withMedia: true,
                imagePosition: imagePositions.topRight
            }),
            ...repeat(2, () =>
                setArticleSettings(standardCardDefaults, {
                    variantsDisabled: [],
                    imageConfig: size.M,
                    imagePosition: imagePositions.topRight
                })
            )
        ],
        bn_1_1_grid: [
            setArticleSettings(leadCardDefaults, {
                variantsDisabled: variantsDisabledByType.author,
                cardSize: '2xl',
                imageConfig: size.T1,
                withMarqueeImg: false,
                withSection: false,
                withMedia: true,
                imagePosition: imagePositions.topRight,
                isCustomVoiceCandidate: false
            }),
            setArticleSettings(gridCardDefaults, {
                variantsDisabled: []
            })
        ],
        bn_2_1_2_grid: [
            setArticleSettings(standardCardDefaults, {
                variantsDisabled: variantsDisabledByType.liveblogAuthor,
                withMedia: true,
                withSubhead: true,
                cardSize: size.XL,
                imageConfig: size.T1,
                imagePosition: imagePositions.top
            }),
            setArticleSettings(standardCardDefaults, {
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: imagePositions.top
            }),
            setArticleSettings(standardCardDefaults, {
                variantsDisabled: variantsDisabledByType.liveblogAuthor,
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: imagePositions.topNone
            }),
            setArticleSettings(standardCardDefaults, {
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: imagePositions.top
            }),
            setArticleSettings(standardCardDefaults, {
                variantsDisabled: variantsDisabledByType.liveblogAuthor,
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: imagePositions.topNone
            })
        ],
        bnFondo: [
            {
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                cardSize: size.threeXL,
                imageConfig: size.T1,
                variantsDisabled: variantsDisabledByType.authorLiveblog,
                imagePosition: imagePositions.topLeft,
                isLoadWithPicture: true
            }
        ],
        opinion4: [
            setArticleSettings(opinionCardDefaults, {
                withMedia: true,
                cardSize: size.threeXL,
                imageConfig: size.T1
            }),
            ...repeat(3, () => setArticleSettings(opinionCardDefaults))
        ],
        opinion8: [
            setArticleSettings(opinionCardDefaults, {
                withMedia: true,
                cardSize: size.threeXL,
                imageConfig: size.T1
            }),
            ...repeat(7, () => setArticleSettings(opinionCardDefaults))
        ],
        cajaContent1: [
            setArticleSettings(opinionCardDefaults, {
                withSection: true,
                withSubhead: true,
                withMedia: true,
                cardSize: size.threeXL,
                imageConfig: size.T1
            })
        ],
        foodit_1_grid: [
            {
                variantsDisabled: variantsDisabledByType.author,
                withSection: false,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: '2xl',
                imageConfig: size.T1,
                isLoadWithPicture: true,
                hideBadget: true,
                imagePosition: imagePositions.topRight
            }
        ],
        foodit_3_grid: repeat(3, () =>
            setArticleSettings(gridCardDefaults, {
                hideBadget: true
            })
        ),
        logo_3_grid: repeat(3, () =>
            setArticleSettings(gridCardDefaults, {
                hideBadget: true
            })
        )
    };

    diagramations['bn-4-8'] = diagramations.bnGrilla4;

    return diagramations[diagramation];
};

export const diagramationExceptions = [
    'left-focal',
    'left-focal-without-timeline',
    'center-focal'
];

export default diagramationRules;
