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

export function ModalRemoveIngredient() {
    const { close, modalData } = usePopupHandling();
    const showModal = get(modalData, 'show', false);

    const {
        type = 'recipe',
        bookmarkId,
        setShoppingList
    } = get(modalData, 'data', {});

    return (
        <Dialog
            isOpen={showModal}
            onClose={close}
            position="center"
            classnames={{
                base: 'mx-auto rounded-4 overflow-visible py-16 py-24_md py-32_lg px-16 px-24_md px-32_lg max-w-328 max-w-344_lg',
                wrapper: ''
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

/* <Animate
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
                        clickAction={() =>
                            deleteIngredientList(bookmarkId, setShoppingList)
                        }
                    />
                    <ButtonCancel close={close} />
                </div>
            </Modal>
        </Animate> */
