import React, { useMemo, useEffect } from 'react';
import { Drawer, useDrawerVisibility } from '@ln/ds-common-drawer';
import { DRAWERS_ID } from '../../../DrawerSections/helpers';
import Icon from '../../../../../ui/foodit/icon/default';
import { TabsCookMode } from './tabsCookMode';
import { useAudio } from '../../../AudioFoodit/AudioContext';
import get from '../../../../../../private/common/utils/get';
import { extractSteps, extractIngredients } from '../helper';

export function DrawerMode({ title, article }) {
    const contentElements = get(article, 'content_elements', []);
    const audio = useAudio();

    const steps = useMemo(
        () => extractSteps(contentElements),
        [contentElements]
    );
    const ingredients = useMemo(
        () => extractIngredients(contentElements),
        [contentElements]
    );

    const { isOpen } = useDrawerVisibility(DRAWERS_ID.COOK_MODE);

    useEffect(() => {
        if (!isOpen) {
            audio.pausePlaying();
        }
    }, [isOpen, audio.pausePlaying]);

    return (
        <Drawer
            enableBodyScroll={false}
            id={DRAWERS_ID.COOK_MODE}
            position="bottom"
        >
            <Drawer.Portal>
                <div data-tw>
                    <Drawer.Overlay />
                    <Drawer.Content className="md:w-596 md:min-h-600 md:left-1/2 md:-translate-x-1/2">
                        <Drawer.Header>
                            <h2 className="font-primary font-semibold text-heading-sm line-clamp-1">
                                {title}
                            </h2>
                            <Drawer.CloseButton
                                variant="ghost"
                                isIconOnly
                                size={32}
                                onClick={audio.pausePlaying}
                            >
                                <Icon name="close" />
                            </Drawer.CloseButton>
                        </Drawer.Header>
                        <Drawer.Body className="flex flex-col">
                            <TabsCookMode
                                steps={steps}
                                ingredients={ingredients}
                                audio={audio}
                            />
                        </Drawer.Body>
                    </Drawer.Content>
                </div>
            </Drawer.Portal>
        </Drawer>
    );
}
