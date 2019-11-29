const text = data => {
    return {
        type: 'text',
        text: data.content
    };
};

text.type = 'text';

export default text;
