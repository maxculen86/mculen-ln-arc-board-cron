import React from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';
import { Message } from '../../../Modals/RemoveIngredients/components/Message';

function OptionDelete({
    bookmarkId,
    items,
    setItems,
    deleteFunction,
    filterKey = 'bookmarkId',
    isOpen,
    onClose,
    messageType = 'menu'
}) {
    const handleDelete = async () => {
        try {
            if (!deleteFunction || deleteFunction.toString() === '() => {}') {
                const updatedItems = items.filter(
                    item => item[filterKey] !== bookmarkId
                );
                setItems(updatedItems);
                onClose();
                return;
            }

            const result = await deleteFunction({ bookmarkId });

            let bookmarkIdResponse;
            if (result && typeof result === 'object') {
                bookmarkIdResponse = result.bookmarkId;
            } else {
                bookmarkIdResponse = bookmarkId;
            }

            if (bookmarkIdResponse) {
                const updatedItems = items.filter(
                    item => item[filterKey] !== bookmarkId
                );
                setItems(updatedItems);
                onClose();
            } else {
                console.error('Failed to delete item.');
                onClose();
            }
        } catch (error) {
            console.error('Error deleting item:', error);
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
                <Message
                    type={messageType}
                    bookmarkId={bookmarkId}
                    userBookmarks={items}
                />
                <div className="flex gap-16 border border-top border-thin border-light-100 pt-16 mt-16 pt-24_md mt-24_md pt-32_lg mt-32_lg">
                    <Button
                        onClick={() => handleDelete()}
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

export default OptionDelete;
