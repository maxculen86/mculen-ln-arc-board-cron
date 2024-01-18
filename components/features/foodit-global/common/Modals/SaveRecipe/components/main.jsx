import { Inputfield } from '@ln/common-ui-inputfield';
import { Select } from '@ln/common-ui-select';
import { Itemcard } from '@ln/foodit-ui-itemcard';

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
    // TODO: Tomar valores de la API
    const folders = [
        { value: 'new', label: 'Nueva carpeta' },
        { value: 'martes', label: 'Para los martes' },
        { value: 'jueves', label: 'Para los jueves' },
        { value: 'jueves', label: 'Para los viernes' }
    ];

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
                    {folders.map(({ label, value }) => (
                        <Select.Options
                            key={value}
                            value={value}
                            label={label}
                            as={props => (
                                <Itemcard type="button" hideIcon {...props} />
                            )}
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
