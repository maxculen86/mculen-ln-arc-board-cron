import React, { useState } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Dialog } from '@ln/common-ui-dialog';
import { cx } from '@ln/cva';
import { Text } from '@ln/common-ui-text';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { SelectMenu } from '../SaveMenu/SelectMenu';
import { FooterMenu } from '../SaveMenu/FooterMenu';
import get from '../../../../../private/common/utils/get';
import { addToast, TOAST } from '../../bookmark/api/_helper';
import { saveMenu } from '../../bookmark/api/menuSave';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import EmptyState from '../../emptyState/foodit';
import { getVariantBarrier } from '../../emptyState/helpers';
import { dayFoodQuantities } from '../helpers/_helper';

function MenuSemanalDialog({
    article,
    onClose,
    isOpen,
    weeklyMenu,
    setWeeklyMenu
}) {
    const { isSubscribed, userType } = useGetUserConfig();
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);
    const countDayFood = dayFoodQuantities(weeklyMenu);

    const classContainer = cx(
        'mx-auto rounded-4',
        isSubscribed
            ? 'overflow-visible py-16 py-24_md py-32_lg px-16 px-24_md px-32_lg w-328 min-w-344_lg'
            : 'p-16 p-24_md p-32_lg max-w-328 min-w-720_md min-w-944_lg bg-positive'
    );

    const handleClose = () => {
        setSelectedDay(null);
        setSelectedFood(null);
        onClose();
    };

    const saveMenuWeekly = async () => {
        handleClose();
        const dayFoodSelected = countDayFood.find(
            info => info.day === selectedDay && info.food === selectedFood
        );
        const canSave = get(dayFoodSelected, 'count', 0) < 3;
        if (!canSave) {
            addToast({
                variant: TOAST.ERROR.VARIANT,
                title: TOAST.ERROR.TITLE,
                message: TOAST.ERROR.MESSAGE.LIMIT_MENU
            });
            return;
        }

        const result = await saveMenu({ article, selectedDay, selectedFood });

        setWeeklyMenu(prevState => [...prevState, result]);

        if (result?.bookmarkId) {
            addEventToDataLayerV2({
                event: 'e_linkclick',
                category: 'interaction',
                action: 'guardar',
                label: 'menu_semanal',
                title: get(article, 'headlines.basic', ''),
                articleId: get(article, '_id', '')
            });
        }
    };

    const renderDialogHeader = (className, children) => (
        <Dialog.Header className={className}>
            {children}
            <Button
                onClick={handleClose}
                variant="link"
                title="Cerrar"
                aria-label="Cerrar"
            >
                <Icon>
                    <IconSprite name="close" />
                </Icon>
            </Button>
        </Dialog.Header>
    );

    return (
        <Dialog
            isOpen={isOpen}
            onClose={handleClose}
            position="center"
            classnames={{
                base: classContainer,
                wrapper: 'flex flex-column gap-16 gap-24_md gap-32_lg'
            }}
            overlay
            closeOnClickOutside
        >
            {isSubscribed ? (
                <>
                    {renderDialogHeader(
                        'flex jc-between gap-16 pb-16 border border-bottom border-thin border-light-100',
                        <Text className="text-24 text-28_md text-32_lg prumo prumo-semibold">
                            Agregar al menú semanal
                        </Text>
                    )}
                    <Dialog.Body>
                        <div className="flex flex-column gap-16 gap-24_md gap-32_lg">
                            <div className="border border-bottom border-thin border-light-100 pb-16 pb-24_md pb-32_lg">
                                <SelectMenu
                                    setSelectedDay={setSelectedDay}
                                    setSelectedFood={setSelectedFood}
                                    selectedDay={selectedDay}
                                    selectedFood={selectedFood}
                                    articleId={get(article, '_id', '')}
                                    weeklyMenu={weeklyMenu}
                                />
                            </div>
                            <FooterMenu
                                setSelectedDay={setSelectedDay}
                                setSelectedFood={setSelectedFood}
                                selectedDay={selectedDay}
                                selectedFood={selectedFood}
                                onClose={handleClose}
                                saveMenuWeekly={saveMenuWeekly}
                            />
                        </div>
                    </Dialog.Body>
                </>
            ) : (
                <>
                    {renderDialogHeader('flex jc-end')}
                    <Dialog.Body>
                        <EmptyState
                            variant={getVariantBarrier(userType)}
                            direction="column"
                        />
                    </Dialog.Body>
                </>
            )}
        </Dialog>
    );
}

export default MenuSemanalDialog;
