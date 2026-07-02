import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { getAccessSource } from '../../utils/getAccessSource';
import isSSR from '../../../../../private/LN/common/utils/isSSR';

const ROOT_KEY = 'foodit_back_root_path';

export function BackButton({ variant = 'link', iconOnly }) {
    if (isSSR()) return null;

    const isPWA = getAccessSource() === 'pwa';

    if (!isPWA) return null;

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

    return (
        <div className="h-100 flex ai-center border border-all_lg border-thin rounded-4 border-secondary-positive p-8_lg">
            <Button
                onClick={handleClick}
                title="Ir atrás"
                variant={variant}
                iconOnly={iconOnly}
                size={32}
            >
                <Icon size={20}>
                    <IconSprite
                        className="text-primary-positive"
                        name="arrow-left"
                    />
                </Icon>
            </Button>
        </div>
    );
}
