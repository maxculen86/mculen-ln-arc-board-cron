import React, { useRef, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { Animate } from '@ln/common-ui-animate';
import { Text } from '@ln/common-ui-text';
import { Modal as ModalFoodit } from '@ln/foodit-ui-modal';
import { Inputfield } from '@ln/common-ui-inputfield';
import { Button } from '@ln/foodit-ui-button';
import useInputListener from '../../Modals/SaveRecipe/hooks/useInputListener';
import { renameFolder } from '../helpers/editFolderHelper';
import { ErrorMessage } from '../../errorMessage/foodit';

function EditFolderModal({
    onClose,
    setUserBookmarks,
    setSelectedItem,
    folderId = '',
    isOpen
}) {
    const inputRef = useRef(null);

    const {
        onChange: onInputFolderChange,
        value: inputValue,
        error: inputError,
        restoreInputValue,
        setValue
    } = useInputListener(folderId);

    const handleClose = () => {
        restoreInputValue();
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setValue(folderId);
        }
    }, [isOpen, folderId, setValue]);

    return (
        <Animate
            duration={400}
            onClose={() => onClose}
            transitionIn={['fade-in']}
            transitionOut={['fade-out']}
            show={isOpen}
        >
            <ModalFoodit
                classNameModal="rounded-4 h-fit p-16 p-24_md p-32_lg flex gap-16 gap-24_md gap-32_lg bg-light-1 max-w-328"
                classNameWrapper="px-16"
                id="modal-save"
                onClose={handleClose}
                show
            >
                <header className="border border-bottom border-thin border-light-100 flex gap-16">
                    <Text
                        as="h2"
                        className="prumo prumo-semibold text-24 text-28_md text-32_lg flex gap-16"
                    >
                        Editar
                    </Text>
                </header>
                <div className="flex flex-column">
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
                        value={folderId}
                        inputRef={inputRef}
                        error={Boolean(inputError?.hasError)}
                        errorClassName="border-danger-600"
                        errorMessage={
                            <ErrorMessage message={inputError?.message} />
                        }
                    />
                </div>
                <hr />
                <footer className="flex gap-16">
                    <Button
                        variant="primary"
                        title="Guardar"
                        fullWidth
                        size={40}
                        onClick={() => {
                            onClose();
                            renameFolder({
                                oldFolderName: folderId,
                                newFolderName: inputValue,
                                setSelectedItem,
                                setUserBookmarks
                            });
                        }}
                        disabled={
                            Boolean(inputError?.hasError) ||
                            inputValue === folderId
                        }
                    >
                        Guardar
                    </Button>
                    <Button
                        variant="secondary"
                        title="Cancelar"
                        size={40}
                        fullWidth
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                </footer>
            </ModalFoodit>
        </Animate>
    );
}

EditFolderModal.propTypes = {
    onClose: PropTypes.isRequired,
    setUserBookmarks: PropTypes.isRequired,
    setSelectedItem: PropTypes.isRequired,
    folderId: PropTypes.isRequired,
    isOpen: PropTypes.isRequired
};
export default EditFolderModal;
