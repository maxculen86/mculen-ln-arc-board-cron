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

    const author = 'author';
    const liveblog = 'liveblog';
    const html = 'html';
    const ranking = 'ranking';
    const txtCenter = '--txt-center';
    // const tabTextCenter = '--tab-txt-center'; TO-DO: use for Hashtag L img-right //

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
                withPreload: true,
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: size.S,
                isLoadWithPicture: true,
                withPreload: true,
                isFetchPriorityHigh: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: size.S,
                isLoadWithPicture: true
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
                imageConfig: size.S,
                isLoadWithPicture: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                imageConfig: size.S,
                isLoadWithPicture: true
            }
        ],
        'center-focal': [
            {
                variantsDisabled: [author, liveblog],
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
                },
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
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
                withSubhead: false,
                isLoadWithPicture: true,
                isFetchPriorityHigh: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [author, liveblog],
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
                },
                isLoadWithPicture: true
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
                withPreload: true,
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                cardSize: size.ML,
                imageConfig: size.S,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: ['author', liveblog],
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
                },
                isLoadWithPicture: true
            }
        ],
        'focal-100': [
            {
                titleTag: tag.h1,
                subheadTag: tag.h2,
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: true,
                cardSize: size.sixXL,
                imageConfig: size.T1Focal100,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withPreload: true,
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
            }
        ],
        'left-focal-without-timeline': [
            {
                type: 'T1',
                titleTag: tag.h1,
                subheadTag: tag.h2,
                withSection: true,
                withMarquee: true,
                withMarqueeImg: true,
                withSubhead: true,
                cardSize: size.fourXL,
                imageConfig: size.T1,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.bottom,
                    desktop: img.bottom
                },
                withPreload: true,
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
            },
            {
                type: 'T2',
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: true,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withPreload: true,
                isLoadWithPicture: true,
                isFetchPriorityHigh: true
            },
            {
                type: 'T3',
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withPreload: false,
                isLoadWithPicture: true
            },
            {
                type: 'T4',
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withPreload: false,
                isLoadWithPicture: true
            },
            {
                type: 'T5',
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withPreload: false,
                isLoadWithPicture: true
            },
            {
                type: 'T6',
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withPreload: false,
                isLoadWithPicture: true
            }
        ],
        bn_player_3_grid: [
            {
                type: 'T1',
                variantsDisabled: [liveblog]
            },
            {
                type: 'T2',
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: true,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.L,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withPreload: true,
                isLoadWithPicture: true
            },
            {
                type: 'T3',
                variantsDisabled: [liveblog],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withPreload: false,
                isLoadWithPicture: true
            },
            {
                type: 'T4',
                variantsDisabled: [liveblog],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withPreload: false,
                isLoadWithPicture: true
            }
        ],
        bn_player_4_grid: [
            {
                type: 'T1',
                variantsDisabled: [liveblog]
            },
            {
                type: 'T2',
                variantsDisabled: [liveblog],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: true,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withPreload: true,
                isLoadWithPicture: true
            },
            {
                type: 'T3',
                variantsDisabled: [liveblog],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withPreload: false,
                isLoadWithPicture: true
            },
            {
                type: 'T4',
                variantsDisabled: [liveblog],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withPreload: false,
                isLoadWithPicture: true
            },
            {
                type: 'T5',
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withPreload: false,
                isLoadWithPicture: true
            }
        ],

        'bn-opening-4': [
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.ML,
                withSubhead: false,
                imageConfig: size.S,
                withPreload: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                isLoadWithPicture: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                isLoadWithPicture: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                isLoadWithPicture: true
            },
            {
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                isLoadWithPicture: true
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
                aspectRatio: 'ratio-3-2',
                className: txtCenter,
                withPreload: true,
                extraClass: { withoutMedia: '--no-mc' },
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
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
                aspectRatio: 'ratio-3-4',
                className: txtCenter,
                withPreload: true,
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
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
                hideBadget: false
            },
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                hideBadget: false,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                hideBadget: false,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                hideBadget: false,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [author, liveblog, html],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withMedia: true,
                withSubhead: false,
                withMarquee: true,
                withMarqueeImg: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                hideBadget: false,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
            }
        ],
        bn_6_timeline: [
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.S,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.S,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
            }
        ],
        'ranking-1-2-2_grid': [
            {
                variantsDisabled: [liveblog],
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                cardSize: size.L,
                imageConfig: size.S,
                withSubhead: false,
                withMarqueeImg: false,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.right
                },
                cardSize: size.M,
                imageConfig: ranking,
                withSubhead: false,
                withMarqueeImg: false,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.right
                },
                cardSize: size.M,
                imageConfig: ranking,
                withSubhead: false,
                withMarqueeImg: false,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.right
                },
                imageConfig: ranking,
                cardSize: size.M,
                withSubhead: false,
                withMarqueeImg: false,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                imagePosition: {
                    mobile: img.right,
                    tablet: img.none,
                    desktop: img.right
                },
                cardSize: size.M,
                imageConfig: size.M,
                withSubhead: false,
                withMarqueeImg: false,
                isLoadWithPicture: true
            }
        ],
        'hash-1-2-2-2_grid': [
            // TO-DO size.L imagePosition{mobile:img.right} => className: tabTextCenter //
            {
                variantsDisabled: [liveblog],
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.M,
                imageConfig: size.S,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                className: txtCenter,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                className: txtCenter,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                className: txtCenter,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                className: txtCenter,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                className: txtCenter,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                className: txtCenter,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                withMarquee: false,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                className: txtCenter,
                isLoadWithPicture: true
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
                },
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
            }
        ],
        bn_player_horizontal: [
            {
                type: 'T1',
                variantsDisabled: [author],
                cardSize: size.XLL,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                withSubhead: true,
                withSection: true,
                isCustomVoiceCandidate: true
            }
        ],
        bn_1_grid: [
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
                },
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
            }
        ],
        bn_2_grid: [
            {
                variantsDisabled: [liveblog],
                cardSize: size.ML,
                imageConfig: size.T1,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog],
                cardSize: size.ML,
                imageConfig: size.S,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                withSubhead: false,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                isLoadWithPicture: true
            }
        ],
        bn_3_grid: [
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
                withMedia: true,
                withSubhead: false,
                cardSize: size.ML,
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
                withMedia: true,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.XS
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
                },
                isLoadWithPicture: true
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
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
                },
                isLoadWithPicture: true
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
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
                },
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true
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
                },
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
            },
            {
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
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
                },
                isLoadWithPicture: true,
                isCustomVoiceCandidate: true
            },
            {
                variantsDisabled: [],
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [],
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.M,
                isLoadWithPicture: true
            }
        ],
        bn_1_1_grid: [
            {
                variantsDisabled: [author, liveblog],
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
                },
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [],
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                withMarquee: true,
                withMarqueeImg: false,
                withSubhead: false,
                cardSize: size.ML,
                imageConfig: size.XS,
                isLoadWithPicture: true
            }
        ],
        bn_2_1_2_grid: [
            {
                variantsDisabled: [author],
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
                },
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog, author],
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog, author],
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.none,
                    desktop: img.none
                },
                isLoadWithPicture: true
            },
            {
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.top,
                    desktop: img.top
                },
                isLoadWithPicture: true
            },
            {
                variantsDisabled: [liveblog, author],
                withSection: false,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: size.ML,
                imageConfig: size.XS,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.none,
                    desktop: img.none
                },
                isLoadWithPicture: true
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
                imageConfig: size.T1,
                variantsDisabled: [author, liveblog],
                imagePosition: {
                    mobile: img.top,
                    tablet: img.left,
                    desktop: img.left
                },
                isLoadWithPicture: true
            }
        ],
        opinion4: [
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: size.threeXL,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true,
                imageConfig: size.T1
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            }
        ],
        opinion8: [
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: size.threeXL,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true,
                imageConfig: size.T1
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            },
            {
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: false,
                cardSize: size.M,
                titleTag: tag.h2,
                subheadTag: tag.h3,
                isLoadWithPicture: true
            }
        ],
        cajaContent1: [
            {
                variantsDisabled: [liveblog],
                titleTag: tag.h2,
                subheadTag: tag.h3,
                withSection: true,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: true,
                withMedia: true,
                cardSize: size.threeXL,
                imageConfig: size.T1,
                isLoadWithPicture: true
            }
        ],
        foodit_1_grid: [
            {
                variantsDisabled: [author],
                withSection: false,
                withSubhead: true,
                withMarquee: true,
                withMarqueeImg: false,
                withMedia: true,
                cardSize: '2xl',
                imageConfig: size.T1,
                isLoadWithPicture: true,
                hideBadget: true,
                imagePosition: {
                    mobile: img.top,
                    tablet: img.right,
                    desktop: img.right
                }
            }
        ],
        foodit_3_grid: [
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
                imageConfig: size.XS,
                isLoadWithPicture: true,
                hideBadget: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true,
                hideBadget: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true,
                hideBadget: true
            }
        ],
        logo_3_grid: [
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
                imageConfig: size.XS,
                isLoadWithPicture: true,
                hideBadget: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true,
                hideBadget: true
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
                imageConfig: size.XS,
                isLoadWithPicture: true,
                hideBadget: true
            }
        ]
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
