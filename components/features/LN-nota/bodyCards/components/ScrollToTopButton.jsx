import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

function ScrollToTopButton({ onClick }) {
    return (
        <div
            className="grid js-end sticky z-10 grid-col-8 grid-row-3 top-calc-100svh-125_md grid-col-12_m grid-col-11_md grid-col-15_lg"
            style={{
                top: 'calc(100svh - 110px)',
                maxWidth: '40px'
            }}
        >
            <div className="h-40 w-40 w-60_md h-60_md">
                <Button
                    title="Subir"
                    variant="secondary"
                    className="flex p-8 w-100 h-100 bg-light-50 flex-column_m"
                    onClick={onClick}
                    size="inherit"
                    style={{
                        gap: '4px'
                    }}
                >
                    <Icon size={20} style={{ transform: 'rotate(270deg)' }}>
                        <IconSprite name="arrowRightLine" />
                    </Icon>
                    <Text className="--mobile-none text-14 uppercase">
                        subir
                    </Text>
                </Button>
            </div>
        </div>
    );
}

export default ScrollToTopButton;
