import { Inputfield } from '@ln/common-ui-inputfield';
import { Select } from '@ln/common-ui-select';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { loadBookmarkFolders } from '../../../bookmark/foldersHelper';
import { useEffect, useState } from 'react';
import safeJSONParse from '../../../../../private-global/common/utils/safeJSONParse';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';
import { Icon } from '@ln/common-ui-icon';

const MainSaveRecipe = props => {
    const {
        newFolder,
        error,
        selectedFolder,
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
        <main className="mb-16">
            {showSelect && (
                <Select
                    label="Colección"
                    defaultValue={selectedFolder}
                    openClassName="border-secondary-positive"
                    hoverClassName="border-accent-lechuga__hover"
                    listClassName="foodit-scrollbar shadow-down-lg"
                    onChange={onSelectChange}
                    name="select"
                    floatingLabelProps={{
                        className: 'bg-white'
                    }}
                >
                    {folders.map(({ bookmarkGroup, value }) => (
                        <Select.Options
                            key={value || bookmarkGroup}
                            value={value || bookmarkGroup}
                            label={bookmarkGroup}
                            as={props => {
                                return (
                                    <>
                                        {value === 'new' ? (
                                            <span className="flex ai-center roboto-bold py-8 text-12 gap-8 border border-bottom border-thin border-light-100">
                                                <Icon size={16}>
                                                    <IconSprite name="plus" />
                                                </Icon>
                                                {bookmarkGroup}
                                            </span>
                                        ) : (
                                            <Itemcard
                                                type="button"
                                                {...props}
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
                <>
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
                        errorClassName="todo-define-error-classname"
                    />
                    {/* MOSTRAR MENSAJE DE ERROR */}
                    {error?.message && <p>{error.message}</p>}
                </>
            )}
        </main>
    );
};

export default MainSaveRecipe;
