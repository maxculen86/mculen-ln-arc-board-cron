const isAnyGrilla1 = (renderables = []) => {
    return renderables.some((elem = {}) => {
        const { props = {}, type = '' } = elem;
        const { customFields = {} } = props;
        const { layout = '' } = customFields;
        return type === 'Ln_Caja_Collection' && layout === 'grilla1';
    });
};

export default isAnyGrilla1;
