import { Inputfield } from '@ln/common-ui-inputfield';
import { Select } from '@ln/common-ui-select';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { loadBookmarkFolders } from '../../../bookmark/foldersHelper';
import { useEffect, useState } from 'react';
import safeJSONParse from '../../../../../private-global/common/utils/safeJSONParse';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';
import { Icon } from '@ln/common-ui-icon';
import { ErrorMessage } from '../../../errorMessage/foodit';

const MainSaveRecipe = props => {
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
                    listClassName="foodit-scrollbar shadow-down-lg bg-white px-16 pb-16 rounden-4"
                    onChange={onSelectChange}
                    floatingLabelProps={{
                        className: 'bg-white'
                    }}
                >
                    {folders.map(({ bookmarkGroup, value }) => (
                        <Select.Options
                            key={value || bookmarkGroup}
                            value={value || bookmarkGroup}
                            label={bookmarkGroup}
                            as={propsAs => {
                                return (
                                    <>
                                        {value === 'new' ? (
                                            <span
                                                className="flex ai-center roboto-bold py-8 text-14 gap-8 border border-bottom border-thin border-light-100"
                                                data-test-id="button-bookmark-create-collection"
                                            >
                                                <Icon size={16}>
                                                    <IconSprite name="plus" />
                                                </Icon>
                                                {bookmarkGroup}
                                            </span>
                                        ) : (
                                            <Itemcard
                                                type="button"
                                                {...propsAs}
                                            />
                                        )}
                                    </>
                                );
                            }}
                        />
                    ))}
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
                    />
                    <ErrorMessage message={error?.message} />
                </div>
            )}
        </div>
    );
};

export default MainSaveRecipe;
