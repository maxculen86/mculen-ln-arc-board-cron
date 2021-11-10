const getAnexoConfig = anexo => {
    const anexoConfigElements = anexo.replace(/ /g, '').split('|', 4) || [];
    let anexoSuperior = [];
    let anexoInferior = [];
    if (anexoConfigElements.length === 4) {
        const middleIndex = Math.ceil(anexoConfigElements.length / 2);
        const firstConfig = anexoConfigElements.splice(0, middleIndex);
        const secondConfig = anexoConfigElements.splice(-middleIndex);
        anexoSuperior = firstConfig[1] === 'S' ? firstConfig : secondConfig;
        anexoInferior = secondConfig[1] === 'I' ? secondConfig : firstConfig;
        return { anexoSuperior, anexoInferior };
    }
    if (anexoConfigElements.length === 2) {
        anexoSuperior =
            anexoConfigElements[1] === 'S' ? anexoConfigElements : [];
        anexoInferior =
            anexoConfigElements[1] === 'I' ? anexoConfigElements : [];
        return { anexoSuperior, anexoInferior };
    }
    return { anexoSuperior, anexoInferior };
};

export default getAnexoConfig;
