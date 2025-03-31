import React, { useState } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Dialog } from '@ln/common-ui-dialog';
import { useDisclosure } from '@ln/hooks';
import { cx } from '@ln/cva';
import { Text } from '@ln/common-ui-text';
import PropTypes from 'prop-types';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { SelectMenu } from '../SaveMenu/SelectMenu';
import { FooterMenu } from '../SaveMenu/FooterMenu';
import { dayFoodQuantities } from '../helpers/_helper';
import getBookmarks from '../../bookmark/api/getBookmarks';
import useAuthManager from '../../../../../private/common/auth/hooks/useAuthManager';
import get from '../../../../../private/common/utils/get';
import { addToast, TOAST } from '../../bookmark/api/_helper';
import { saveMenu } from '../../bookmark/api/menuSave';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import EmptyState from '../../emptyState/foodit';
import { getVariantBarrier } from '../../emptyState/helpers';

function MenuSemanalDialog({ article }) {
    const { isOpen, onOpen, onClose } = useDisclosure(false);
    const { isSubscribed, userType } = useGetUserConfig();
    const [countDayFood, setCountDayFood] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedFood, setSelectedFood] = useState('');
    const { token, accessToken } = useAuthManager();

    const classContainer = cx(
        'mx-auto rounded-4',
        isSubscribed
            ? 'overflow-visible py-16 py-24_md py-32_lg px-16 px-24_md px-32_lg w-328 min-w-344_lg'
            : 'p-16 p-24_md p-32_lg max-w-328 min-w-720_md min-w-944_lg bg-positive'
    );

    const handleOpen = async () => {
        onOpen();
        const { data = [] } = await getBookmarks(
            token,
            accessToken,
            'weeklyMenu'
        );

        setCountDayFood(dayFoodQuantities(data));
    };
    const handleClose = () => {
        setSelectedDay(null);
        setSelectedFood(null);
        onClose();
    };
    const saveMenuWeekly = async () => {
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
            return handleClose();
        }

        const result = await saveMenu({ article, selectedDay, selectedFood });

        if (result) {
            addEventToDataLayerV2({
                event: 'e_linkclick',
                category: 'interaction',
                action: 'guardar',
                label: 'menu_semanal',
                title: get(article, 'headlines.basic', ''),
                articleId: get(article, '_id', '')
            });
        }

        return handleClose();
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
        <>
            <Button
                title="agregar al menú"
                variant="secondary"
                onClick={handleOpen}
                className="flex ai-center gap-8 max-h-32 min-h-40_lg"
                style={{ padding: '8px 16px' }}
            >
                <Icon size={16}>
                    <IconSprite name="weekly-menu" critical />
                </Icon>
                agregar al menú
            </Button>
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
        </>
    );
}
MenuSemanalDialog.propTypes = {
    article: PropTypes.shape({}).isRequired
};
export default MenuSemanalDialog;
