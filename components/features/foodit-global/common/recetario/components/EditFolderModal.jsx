import React, { useRef, useEffect } from 'react';
import { Text } from '@ln/common-ui-text';
import { Inputfield } from '@ln/common-ui-inputfield';
import { Button } from '@ln/foodit-ui-button';
import { Dialog } from '@ln/common-ui-dialog';
import { Icon } from '@ln/common-ui-icon';
import useInputListener from '../../Modals/SaveRecipe/hooks/useInputListener';
import { renameFolder } from '../helpers/editFolderHelper';
import { ErrorMessage } from '../../errorMessage/foodit';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

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
        <Dialog
            isOpen={isOpen}
            onClose={handleClose}
            position="center"
            classnames={{
                base: 'w-328 overflow-visible rounded-4 h-fit p-16 p-24_md p-32_lg gap-16 gap-24_md gap-32_lg bg-light-1',
                wrapper: 'flex flex-column gap-16 gap-24_md gap-32_lg'
            }}
            overlay
            closeOnClickOutside
        >
            <Dialog.Header className="border border-bottom border-thin border-light-100 flex jc-between ai-center gap-16 pb-16">
                <Text
                    as="h2"
                    className="prumo prumo-semibold text-24 text-28_md text-32_lg flex gap-16"
                >
                    Editar
                </Text>
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
            <Dialog.Body>
                <div className="flex flex-column">
                    <Inputfield
                        autoFocus
                        type="text"
                        focusClassName="border-secondary-positive roboto roboto-regular text-12"
                        hoverClassName="border-accent-lechuga__hover roboto roboto-regular text-12"
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
                        closable
                    />
                </div>
            </Dialog.Body>
            <Dialog.Footer className="flex flex-column gap-16 gap-24_md gap-32_lg">
                <div className="flex gap-16 border border-top pt-16 pt-24_md pt-32_md border-thin border-light-100">
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
                </div>
            </Dialog.Footer>
        </Dialog>
    );
}

export default EditFolderModal;
