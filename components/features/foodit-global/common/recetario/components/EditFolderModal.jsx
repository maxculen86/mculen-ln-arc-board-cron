import React, { useRef } from 'react';

import useInputListener from '../../Modals/SaveRecipe/hooks/useInputListener';

import { Modal as ModalFoodit } from '@ln/foodit-ui-modal';
import { Inputfield } from '@ln/common-ui-inputfield';
import { Button } from '@ln/foodit-ui-button';
import { renameFolder } from '../helpers/editFolderHelper';

const EditFolderModal = ({
    onClose,
    setUserBookmarks,
    setSelectedItem,
    folderId = ''
}) => {
    const inputRef = useRef(null);

    const {
        onChange: onInputFolderChange,
        value: inputValue,
        error: inputError
    } = useInputListener(folderId);

    return (
        <ModalFoodit
            classNameModal={
                'rounded-4 h-fit p-16 p-24_md p-32_lg flex gap-16 gap-24_md gap-32_lg bg-light-1 max-w-328'
            }
            classNameWrapper="px-16"
            id="modal-save"
            onClose={onClose}
            show
        >
            <header className="border border-bottom border-thin border-light-100 flex gap-16">
                <h2 className="prumo prumo-semibold text-24 text-28_md text-32_lg flex gap-16">
                    Editar
                </h2>
            </header>
            <Inputfield
                autoFocus
                type="text"
                focusClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                label="Colección"
                floatingLabelProps={{
                    className: 'bg-white'
                }}
                onChange={onInputFolderChange}
                value={inputValue}
                inputRef={inputRef}
                error={Boolean(inputError?.hasError)}
                errorClassName="todo-define-error-classname"
            />
            {inputError?.message && <p>{inputError.message}</p>}
            <hr />
            <footer className="flex gap-16">
                <Button
                    variant="primary"
                    title={'Guardar'}
                    fullWidth
                    size={40}
                    onClick={() => {
                        onClose();
                        renameFolder({
                            oldFolderName: folderId,
                            newFolderName: inputValue,
                            setSelectedItem,
                            setUserBookmarks,
                            onClose
                        });
                    }}
                    disabled={Boolean(inputError?.hasError)}
                >
                    Guardar
                </Button>
                <Button
                    variant="secondary"
                    title={'Cancelar'}
                    size={40}
                    fullWidth
                    onClick={onClose}
                >
                    Cancelar
                </Button>
            </footer>
        </ModalFoodit>
    );
};

export default EditFolderModal;
