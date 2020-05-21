const header = data => {
    return {
        _t: `sub${data.level}`,
        valor: data.content
    };
};

header.type = 'header';

export default header;
