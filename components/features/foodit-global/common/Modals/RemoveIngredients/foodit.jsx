import React from 'react';
import { Animate } from '@ln/common-ui-animate';
import { Modal } from '@ln/foodit-ui-modal';
import { Message } from './components/Message';
import { ButtonAccept } from './components/ButtonAccept';
import { ButtonCancel } from './components/ButtonCancel';
import { usePopupHandling } from './hooks/usePopupHandling';
import get from '../../../../../private/common/utils/get';
import deleteIngredientList from '../../shoppingList/api/deleteIngredientList';

export const ModalRemoveIngredient = () => {
    const { close, modalData } = usePopupHandling();
    const showModal = get(modalData, 'show', false);

    const {
        type = 'recipe',
        displayName = '',
        bookmarkId,
        setShoppingList
    } = get(modalData, 'data', {});

    return (
        <Animate
            transitionIn={['fade-in']}
            transitionOut={['fade-out']}
            duration={400}
            show={showModal}
        >
            <Modal
                id="modal-delete"
                classNameModal="bg-light-1 rounded-4 h-fit p-16 p-24_md p-32_lg gap-16 gap-24_md gap-32_lg max-w-328"
                classNameWrapper="px-16"
                classNameBackDrop="z-15"
                onClose={close}
                show
            >
                <Message type={type} />
                <hr />
                <div className="flex ai-center gap-16">
                    <ButtonAccept
                        close={close}
                        type={type}
                        displayName={displayName}
                        clickAction={() =>
                            deleteIngredientList(bookmarkId, setShoppingList)
                        }
                    />
                    <ButtonCancel close={close} />
                </div>
            </Modal>
        </Animate>
    );
};
