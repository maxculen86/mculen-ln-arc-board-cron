const defaultCuerpo = (dataNota, components) => {
    const resp = dataNota.content_elements
        .filter(v => {
            const selectedComponent = components.find(c => c.type === v.type);
            if (selectedComponent) return true;
            return false;
        })
        .map(v => {
            const selectedComponent = components.find(c => c.type === v.type);
            const render = selectedComponent(v, dataNota);
            return render;
        });

    return resp;
};

export default defaultCuerpo;
