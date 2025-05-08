import React from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';

import PropTypes from 'prop-types';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';

import deleteWeeklyMenu from '../../../bookmark/api/menuDelete';
import { Message } from '../../../Modals/RemoveIngredients/components/Message';

function OptionDelete({
    weeklyMenu,
    bookmarkId,
    setWeeklyMenu,
    isOpen,
    onClose
}) {
    const deleteMenuWeekly = async () => {
        try {
            const { bookmarkId: bookmarkIdResponse } = await deleteWeeklyMenu({
                bookmarkId
            });
            if (bookmarkIdResponse) {
                const updatedMenu = weeklyMenu.filter(
                    menu => menu.bookmarkId !== bookmarkId
                );
                setWeeklyMenu(updatedMenu);
                onClose();
            } else {
                console.error('Failed to delete menu.');
                onClose();
            }
        } catch (error) {
            console.error('Error deleting menu:', error);
            onClose();
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            position="center"
            classnames={{
                base: 'mx-auto rounded-4 overflow-visible py-16 py-24_md py-32_lg px-16 px-24_md px-32_lg w-328 min-w-344_lg'
            }}
            overlay
            closeOnClickOutside
        >
            <Dialog.Header className="flex jc-end pb-16 pb-24_md pb-32_lg">
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
                <Message type="menu" />
                <div className="flex gap-16 border border-top border-thin border-light-100 pt-16 mt-16 pt-24_md mt-24_md pt-32_lg mt-32_lg">
                    <Button
                        onClick={() => deleteMenuWeekly()}
                        fullWidth
                        title="aceptar"
                        variant="primary"
                    >
                        Aceptar
                    </Button>
                    <Button
                        onClick={onClose}
                        fullWidth
                        title="cancelar"
                        variant="secondary"
                    >
                        Cancelar
                    </Button>
                </div>
            </Dialog.Body>
        </Dialog>
    );
}
OptionDelete.propTypes = {
    bookmarkId: PropTypes.string.isRequired,
    weeklyMenu: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    setWeeklyMenu: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
export default OptionDelete;
