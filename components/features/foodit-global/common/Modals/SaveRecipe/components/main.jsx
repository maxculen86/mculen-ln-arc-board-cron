import React, { useEffect, useState, HTMLInputElement } from 'react';
import PropTypes from 'prop-types';
import { Inputfield } from '@ln/common-ui-inputfield';
import { Select } from '@ln/common-ui-select';
import { loadBookmarkFolders } from '../../../bookmark/foldersHelper';
import safeJSONParse from '../../../../../private-global/common/utils/safeJSONParse';
import { ErrorMessage } from '../../../errorMessage/foodit';
import RenderOption from './options';

function MainSaveRecipe(props) {
    const {
        newFolder,
        error,
        onInputFolderChange,
        onSelectChange,
        showInputFolder,
        showSelect,
        inputRef
    } = props;

    const [folders, setFolders] = useState([
        { bookmarkGroup: 'Crear colección', value: 'new' }
    ]);

    useEffect(() => {
        const fetchFolders = async () => {
            const localFolders = localStorage.getItem('bookmarkFolders');

            if (localFolders) {
                setFolders([...folders, ...safeJSONParse(localFolders)]);
            } else {
                const fetchedFolders = await loadBookmarkFolders();
                setFolders([...folders, ...safeJSONParse(fetchedFolders)]);
            }
        };

        fetchFolders();
    }, []);

    return (
        <div className="mb-16" data-test-id="button-bookmark-show-collections">
            {showSelect && (
                <Select
                    label="Colección"
                    openClassName="border-secondary-positive"
                    hoverClassName="border-accent-lechuga__hover"
                    listClassName="shadow-modal bg-white p-16 rounded-8 border border-all border-thin border-light-100"
                    onChange={onSelectChange}
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
                        focusClassName="border-secondary-positive"
                        hoverClassName="border-accent-lechuga__hover"
                        inputRef={inputRef}
                        label="Colección"
                        floatingLabelProps={{
                            className: 'bg-white'
                        }}
                        error={Boolean(error?.hasError)}
                        errorClassName="border-danger-600"
                        errorMessage={<ErrorMessage message={error?.message} />}
                        closable
                    />
                </div>
            )}
        </div>
    );
}

MainSaveRecipe.propTypes = {
    newFolder: PropTypes.string.isRequired,
    onInputFolderChange: PropTypes.func.isRequired,
    error: PropTypes.shape({
        hasError: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired
    }).isRequired,
    onSelectChange: PropTypes.func.isRequired,
    showInputFolder: PropTypes.bool.isRequired,
    showSelect: PropTypes.bool.isRequired,
    inputRef: PropTypes.shape({
        current: PropTypes.instanceOf(HTMLInputElement)
    }).isRequired
};

export default MainSaveRecipe;
