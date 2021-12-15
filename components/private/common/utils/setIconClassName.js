const setIconClassName = ({ name, href, size = '', negative, extraClass }) => {
    const iconName = name ? `icon-${name}` : '';
    const negativeClass = negative ? ' --negative' : '';
    const iconHrefMod = href ? '' : `${extraClass || ''}`;

    return ['com-icon', iconName, negativeClass, iconHrefMod, size]
        .filter(Boolean)
        .join(' ');
};

export default setIconClassName;
