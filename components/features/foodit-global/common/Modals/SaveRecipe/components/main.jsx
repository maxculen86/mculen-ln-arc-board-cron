import { Inputfield } from '@ln/common-ui-inputfield';
import { Select } from '@ln/common-ui-select';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { loadBookmarkFolders } from '../../../bookmark/foldersHelper';
import { useEffect, useState } from 'react';
import safeJSONParse from '../../../../../private-global/common/utils/safeJSONParse';

const MainSaveRecipe = props => {
    const {
        newFolder,
        selectedFolder,
        onInputFolderChange,
        onSelectChange,
        showInputFolder,
        showSelect,
        suggestions,
        inputRef
    } = props;
    const [folders, setFolders] = useState([
        { bookmarkGroup: 'Nueva carpeta', value: 'new' }
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
                    label="Elegir carpeta"
                    defaultValue={selectedFolder}
                    openClassName="border-secondary-positive"
                    hoverClassName="border-accent-lechuga__hover"
                    listClassName="foodit-scrollbar"
                    onChange={onSelectChange}
                    name="select"
                >
                    {folders.map(({ bookmarkGroup, value }) => (
                        <Select.Options
                            key={value || bookmarkGroup}
                            value={value || bookmarkGroup}
                            label={bookmarkGroup}
                            as={props => <Itemcard type="button" {...props} />}
                        />
                    ))}
                </Select>
            )}
            {showInputFolder && (
                <Inputfield
                    autoFocus
                    type="text"
                    placeholder="Introducir nombre nueva carpeta"
                    onChange={onInputFolderChange}
                    value={newFolder}
                    focusClassName="border-secondary-positive"
                    hoverClassName="border-accent-lechuga__hover"
                    inputRef={inputRef}
                />
            )}
            {suggestions.length ? (
                <div className="py-16">
                    {suggestions.map(suggestion => (
                        <p className="mb-8" key={suggestion}>
                            {suggestion}
                        </p>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </main>
    );
};

export default MainSaveRecipe;
