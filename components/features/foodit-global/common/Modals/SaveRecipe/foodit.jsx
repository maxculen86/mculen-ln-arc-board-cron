import React, { useEffect, useState } from 'react';
import { Modal as ModalFoodit } from '@ln/foodit-ui-modal';
import SaveRecipe from './saveRecipe';
import useIsomorphicPopupHandling from './hooks/useIsomorphicPopupHandling';
import get from '../../../../../private/common/utils/get';

export const Modal = () => {
    const { close, modalData } = useIsomorphicPopupHandling();
    const showModal = get(modalData, 'isVisible', false);
    const ids = get(modalData, 'data.ids', []);

    const [indexStep, setIndexStep] = useState(1);

    const restoreIndex = () => {
        setIndexStep(1);
    };

    return (
        <ModalFoodit
            classNameModal="bg-light-1 rounded-24 h-fit p-24 flex gap-8_md"
            classNameWrapper="px-16"
            id="modal-save"
            show={showModal}
            onClose={() => close(restoreIndex)}
        >
            <SaveRecipe
                ids={ids}
                indexStep={indexStep}
                setIndexStep={setIndexStep}
                close={() => close(restoreIndex)}
            />
        </ModalFoodit>
    );
};

export default Modal;
