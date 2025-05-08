import React from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Message } from './components/Message';
import { ButtonAccept } from './components/ButtonAccept';
import { ButtonCancel } from './components/ButtonCancel';
import { usePopupHandling } from './hooks/usePopupHandling';
import get from '../../../../../private/common/utils/get';
import deleteIngredientList from '../../bookmark/api/deleteIngredientList';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { useShoppingList } from '../../shoppingList/hooks/useShoppingList';

export function ModalRemoveIngredient() {
    const { close, modalData } = usePopupHandling();
    const showModal = get(modalData, 'show', false);
    const { shoppingList } = useShoppingList();

    const {
        type = 'recipe',
        bookmarkId,
        setShoppingList
    } = get(modalData, 'data', {});

    const { text = '' } =
        shoppingList.find(list => list.bookmarkId === bookmarkId) || {};

    return (
        <Dialog
            isOpen={showModal}
            onClose={close}
            position="center"
            classnames={{
                base: 'mx-auto rounded-4 overflow-visible py-16 py-24_md py-32_lg px-16 px-24_md px-32_lg max-w-328 max-w-344_lg'
            }}
            overlay
            closeOnClickOutside
        >
            <Dialog.Header className="flex jc-end pb-16 pb-24_md pb-32_lg">
                <Button
                    onClick={close}
                    variant="link"
                    title="Cerrar"
                    aria-label="Cerrar"
                >
                    <Icon>
                        <IconSprite name="close" />
                    </Icon>
                </Button>
            </Dialog.Header>
            <Message type={type} />
            <div className="flex ai-center gap-16 border border-top border-thin border-light-100 pt-16 mt-16 pt-24_md mt-24_md pt-32_lg mt-32_lg">
                <ButtonAccept
                    title={text}
                    close={close}
                    clickAction={() =>
                        deleteIngredientList(bookmarkId, setShoppingList)
                    }
                />
                <ButtonCancel close={close} />
            </div>
        </Dialog>
    );
}
