const text = data => {
    return {
        _t: 'text',
        text: data.content
    };
};

text.type = 'text';

export default text;
