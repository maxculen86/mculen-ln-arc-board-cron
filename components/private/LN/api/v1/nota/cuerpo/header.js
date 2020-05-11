const header = data => {
    return {
        _t: 'h',
        level: data.level,
        text: data.content
    };
};

header.type = 'header';

export default header;
