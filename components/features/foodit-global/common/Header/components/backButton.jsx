import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

const ROOT_KEY = 'foodit_back_root_path';

export function BackButton({ variant = 'link', iconOnly }) {
    if (typeof window === 'undefined') return null;

    const { pathname } = window.location;

    let rootPath = sessionStorage.getItem(ROOT_KEY);

    if (!rootPath) {
        rootPath = pathname;
        sessionStorage.setItem(ROOT_KEY, rootPath);
    }

    const isRootRoute = pathname === rootPath;

    const canGoBack = window.history.length > 1 && !isRootRoute;

    if (!canGoBack) return null;

    const handleClick = () => {
        window.history.back();
    };

    const classNameContainer =
        variant === 'link'
            ? 'pr-16 pr-24_md h-100 flex ai-center'
            : 'pr-24_md lg-only';

    return (
        <div className={classNameContainer}>
            <Button
                onClick={handleClick}
                title="Ir atrás"
                variant={variant}
                iconOnly={iconOnly}
                size={32}
            >
                <Icon size={iconOnly ? 16 : 24}>
                    <IconSprite
                        className="text-primary-positive"
                        name="arrow-left"
                    />
                </Icon>
            </Button>
        </div>
    );
}

BackButton.propTypes = {
    variant: PropTypes.string.isRequired,
    iconOnly: PropTypes.bool.isRequired
};
