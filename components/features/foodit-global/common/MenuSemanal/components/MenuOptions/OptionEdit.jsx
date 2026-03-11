import React, { useState } from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { cx } from '@ln/cva';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';

import { Text } from '@ln/common-ui-text';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';
import { SelectMenu } from '../../SaveMenu/SelectMenu';
import { FooterMenu } from '../../SaveMenu/FooterMenu';
import { dayFoodQuantities } from '../../helpers/_helper';
import get from '../../../../../../private/common/utils/get';
import { addToast, TOAST } from '../../../bookmark/api/_helper';
import editMenu from '../../../bookmark/api/menuEdit';

function OptionEdit({
    articleId,
    weeklyMenu = [],
    setWeeklyMenu,
    bookmarkId,
    isOpen,
    onClose
}) {
    const menuToEdit = weeklyMenu.find(menu => menu.bookmarkId === bookmarkId);
    const [selectedDay, setSelectedDay] = useState(
        menuToEdit?.bookmarkGroup || ''
    );
    const [selectedFood, setSelectedFood] = useState(
        menuToEdit?.bookmarkContent?.food || ''
    );
    const initialDayRef = React.useRef(menuToEdit?.bookmarkGroup || '');
    const initialFoodRef = React.useRef(
        menuToEdit?.bookmarkContent?.food || ''
    );

    const isDisabled =
        selectedDay === initialDayRef.current &&
        selectedFood === initialFoodRef.current;
    const classContainer = cx(
        'mx-auto rounded-4 overflow-visible py-16 py-24_md py-32_lg px-16 px-24_md px-32_lg w-328 min-w-344_lg'
    );
    const editMenuWeekly = async () => {
        onClose();
        const countDayFood = dayFoodQuantities(weeklyMenu);
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

        const response = await editMenu({
            menuToEdit,
            day: selectedDay,
            food: selectedFood,
            bookmarkId
        });
        const { bookmarkId: newBookmarkId } = response;

        if (newBookmarkId) {
            const weeklyMenuWithoutEdited = weeklyMenu.filter(
                menu => menu.bookmarkId !== bookmarkId
            );
            const newWeeklyMenu = [...weeklyMenuWithoutEdited, response];
            setWeeklyMenu(newWeeklyMenu);

            addToast({
                variant: TOAST.SUCCESS.VARIANT,
                title: TOAST.SUCCESS.TITLE,
                message: TOAST.SUCCESS.MESSAGE.EDIT_MENU
            });
        } else {
            addToast({
                variant: TOAST.ERROR.VARIANT,
                title: TOAST.ERROR.TITLE,
                message: TOAST.ERROR.MESSAGE.GENERIC
            });
        }
    };
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            position="center"
            classnames={{
                base: classContainer,
                wrapper: 'flex flex-column gap-16 gap-24_md gap-32_lg'
            }}
            overlay
            closeOnClickOutside
        >
            <Dialog.Header className="flex jc-between gap-16 pb-16 border border-bottom border-thin border-light-100">
                <Text className="text-24 text-28_md text-32_lg prumo prumo-semibold">
                    Editar menú semanal
                </Text>
                <Button
                    onClick={onClose}
                    variant="link"
                    title="Cerrar"
                    aria-label="Cerrar"
                >
                    <Icon>
                        <IconSprite name="close" />
                    </Icon>
                </Button>
            </Dialog.Header>
            <Dialog.Body>
                <div className="flex flex-column gap-16 gap-24_md gap-32_lg">
                    <div className="border border-bottom border-thin border-light-100 pb-16 pb-24_md pb-32_lg">
                        <SelectMenu
                            setSelectedDay={setSelectedDay}
                            setSelectedFood={setSelectedFood}
                            selectedDay={selectedDay}
                            selectedFood={selectedFood}
                            articleId={articleId}
                            weeklyMenu={weeklyMenu}
                            menuToEdit={menuToEdit}
                        />
                    </div>
                    <FooterMenu
                        setSelectedDay={setSelectedDay}
                        setSelectedFood={setSelectedFood}
                        selectedDay={selectedDay}
                        selectedFood={selectedFood}
                        onClose={onClose}
                        saveMenuWeekly={editMenuWeekly}
                        isDisabled={isDisabled}
                    />
                </div>
            </Dialog.Body>
        </Dialog>
    );
}
export default OptionEdit;
