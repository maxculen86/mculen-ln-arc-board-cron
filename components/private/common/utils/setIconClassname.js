const setIconClassName = ({ name, href, mod, size = '' }) => {
    const iconName = name ? ` icon-${name}` : '';
    const iconHrefMod = href ? '' : ` ${mod || ''}`;

    return ['com-icon', iconName, iconHrefMod, size].join(' ');
};

export default setIconClassName;
