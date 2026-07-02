import React from 'react';
import { Inputfield } from '@ln/common-ui-inputfield';
import { Select } from '@ln/common-ui-select';
import { ErrorMessage } from '../../../errorMessage/foodit';
import RenderOption from './options';
import { useFolders } from '../hooks/useFolders';

function MainSaveRecipe(props) {
    const {
        newFolder,
        error,
        onInputFolderChange,
        onSelectChange,
        showInputFolder,
        showSelect,
        inputRef,
        restoreInputValue,
        mode = 'save',
        currentCollectionId
    } = props;

    const folders = useFolders({
        mode
    });

    const handleSelectChange = event => {
        if (event.value === 'new') {
            restoreInputValue();
        }
        onSelectChange(event);
    };

    return (
        <div data-test-id="button-bookmark-show-collections">
            {showSelect && (
                <Select
                    label={currentCollectionId || 'Seleccionar colección'}
                    floatingLabelText="Colección"
                    openClassName="border-secondary-positive"
                    className="roboto roboto-regular text-12 border-secondary-positive__focus border-accent-lechuga__hover"
                    hoverClassName="border-secondary-positive__focus"
                    listClassName="text-12 roboto roboto-regular shadow-modal bg-white p-16 rounded-8 border border-all border-thin border-light-100"
                    onChange={handleSelectChange}
                    floatingLabelProps={{
                        className: 'bg-white'
                    }}
                >
                    <div className="foodit-scrollbar max-h-198 overflow-y-auto">
                        {folders.map(({ bookmarkGroup, value }) => (
                            <Select.Options
                                key={value || bookmarkGroup}
                                value={value || bookmarkGroup}
                                label={bookmarkGroup}
                                // TODO: Para evitar el disable de la regla se debera modificar la librería Select para soportar children sin romper los estilos actuales del ItemCard.
                                // eslint-disable-next-line react/no-unstable-nested-components
                                as={propsAs => (
                                    <RenderOption
                                        currentCollectionId={
                                            currentCollectionId
                                        }
                                        value={value}
                                        bookmarkGroup={bookmarkGroup}
                                        propsAs={propsAs}
                                    />
                                )}
                            />
                        ))}
                    </div>
                </Select>
            )}

            {showInputFolder && (
                <div className="flex flex-column">
                    <Inputfield
                        autoFocus
                        type="text"
                        onChange={onInputFolderChange}
                        value={newFolder}
                        focusClassName="border-secondary-positive roboto roboto-regular text-12"
                        hoverClassName="border-accent-lechuga__hover"
                        inputRef={inputRef}
                        label="Colección"
                        floatingLabelProps={{
                            className: 'bg-white'
                        }}
                        error={Boolean(error?.hasError)}
                        errorClassName="border-error-default border-error-light__hover border-error-dark__focus"
                        errorMessage={<ErrorMessage message={error?.message} />}
                        closable
                    />
                </div>
            )}
        </div>
    );
}
export default MainSaveRecipe;
