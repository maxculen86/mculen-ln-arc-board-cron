import React from 'react';
import IconSprite from '../../../../ui/ln/icon/default';
import Link from '../../../../ui/ln/link/default';

function NavbarItemContent({ iconName, text }) {
    return (
        <>
            <IconSprite name={iconName} size={20} />
            {text}
        </>
    );
}

function NavbarItem({
    iconName,
    href,
    target,
    text,
    onClick,
    color,
    ...props
}) {
    const shouldRenderButton = onClick && !href;
    const content = <NavbarItemContent iconName={iconName} text={text} />;
    const classNameLink = 'flex items-center justify-center flex-col gap-8';

    if (shouldRenderButton) {
        return (
            <Link
                {...props}
                asChild
                className={classNameLink}
                color={color}
                weight="regular"
                size={12}
            >
                <button type="button" onClick={onClick}>
                    {content}
                </button>
            </Link>
        );
    }

    return (
        <Link
            href={href}
            target={target}
            onClick={onClick}
            className={classNameLink}
            color={color}
            weight="regular"
            size={12}
            {...props}
        >
            {content}
        </Link>
    );
}

export default NavbarItem;
