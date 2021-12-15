const setBtnClassName = ({
    children,
    iconName,
    iconPosition,
    ...restProps
}) => {
    const mainClasses = Object.values(restProps)
        .filter(Boolean)
        .join(' ');
    const icon = iconName && '--icon';
    const iconChildren = iconName && children && `${iconName} ${iconPosition}`;

    console.log(restProps);

    return ['com-button', mainClasses, icon, iconChildren]
        .filter(Boolean)
        .join(' ');
};

export default setBtnClassName;
