import { Icon } from '@ln/common-ui-icon';
import { Resto } from '@ln/foodit-ui-assets';

const MainSaveRecipe = props => {
    const {
        newFolder,
        selectedFolder,
        onInputFolderChange,
        onSelectChange,
        showInputFolder,
        showSelect,
        suggestions
    } = props;
    // TODO: Tomar valores de la API
    const folders = ['Para los martes', 'Para los jueves', 'Para los viernes'];

    return (
        <main className="mb-16">
            <div className="flex ai-center border border-all border-thin border-light-300 rounded-4 py-4 px-8">
                <Icon size={24}>
                    <Resto />
                </Icon>
                {showSelect && (
                    <select
                        name="select"
                        className="w-100 py-8 px-16 cursor-pointer"
                        value={selectedFolder}
                        onChange={onSelectChange}
                    >
                        <option className="p-8" disabled value="Elegir carpeta">
                            Elegir carpeta
                        </option>
                        <option className="p-8" value="Nueva carpeta">
                            Nueva carpeta
                        </option>
                        {folders.map(folder => (
                            <option key={folder} value={folder}>
                                {folder}
                            </option>
                        ))}
                    </select>
                )}
                {showInputFolder && (
                    <input
                        type="text"
                        placeholder="Introducir nombre nueva carpeta"
                        onChange={onInputFolderChange}
                        value={newFolder}
                        className="w-100 py-8 px-16"
                    />
                )}
            </div>
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
