const header = dataHeader => {
    if (!dataHeader) return null;

    return {
        _t: `sub${dataHeader.level}`,
        valor: dataHeader.content
    };
};

header.type = 'header';

export default header;
