import classNames from 'classnames';

export const getUserType = (isSubscribed, userEmail) => {
    if (isSubscribed) return 'subscribed';
    if (userEmail && !isSubscribed) return 'logged';
    return 'unlogged';
};

export const getConfigClassName = ({ sticky, negative, isHome }) => ({
    wrapperMainHeaderClassNames: isHome ? 'h-64 h-86_md h-88_l' : undefined,
    mainHeaderClassNames: classNames(
        'border border-bottom border-thin relative',
        negative
            ? 'bg-black-64 border-neutral-light-900'
            : 'bg-light-50 border-neutral-light-100',
        { 'fixed_l top-0 w-100 z-1500': sticky },
        { '--transition-header': sticky && isHome }
    ),
    mainHeaderContentClassNames: classNames(
        'lay-container h-64',
        sticky ? 'h-64 h-86_md h-56_l' : 'h-64 h-86_md h-88_l'
    ),
    centerOptionsClassNames: classNames(
        'logo-header flex jc-center relative w-152 h-16 w-304_md h-32_md',
        sticky ? 'w-268_l h-28_l' : 'w-380_lg h-40_lg'
    ),
    subHeaderClassNames: classNames(
        'border border-thin border-bottom border-light-300 h-52'
    )
});

export const isHeaderNegative = ({
    layout = '',
    section = '',
    layoutsName = {}
}) => {
    const validationBy = [section, layout];

    const validations = [
        layoutsName.FotoAl100,
        layoutsName.StoryTelling,
        layoutsName.Video,
        layoutsName.LiveBlog,
        layoutsName.VideoAl100,
        layoutsName.Cards,
        '/revista-hola',
        '/revista-lugares'
    ];

    return validationBy.some(validation => validations.includes(validation));
};
