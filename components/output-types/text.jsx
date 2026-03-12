const TextOutputType = props => {
    const { children } = props;
    return children;
};

TextOutputType.contentType = 'text/plain';

TextOutputType.fallback = false;

export default TextOutputType;
