const header = data => {
    return {
        type: 'header',
        level: data.level,
        text: data.content
    };
};

header.type = 'header';

export default header;
