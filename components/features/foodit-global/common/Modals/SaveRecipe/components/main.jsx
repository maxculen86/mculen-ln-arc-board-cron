import { Icon } from '@ln/common-ui-icon';
import { Resto } from '@ln/foodit-ui-assets';

const MainSaveRecipe = props => {
    const {
        folders,
        newFolder,
        selectedFolder,
        setNewFolder,
        setSelectedFolder,
        showInputFolder,
        showSelect,
        suggestions
    } = props;

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
                        onChange={e => setSelectedFolder(e.target.value)}
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
                        onChange={e => setNewFolder(e.target.value)}
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
