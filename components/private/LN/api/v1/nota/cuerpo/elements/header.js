import htmlText from './htmlText';

const header = dataHeader => {
    if (!dataHeader) return null;

    const valor = htmlText(dataHeader.content);
    if (!valor) return null;

    return {
        _t: `sub${dataHeader.level}`,
        valor: valor
    };
};

header.type = 'header';

export default header;
