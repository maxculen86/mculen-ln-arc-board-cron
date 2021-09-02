const force404AMP = ({ outputType = 'default' }) => {
    if (outputType === 'amp') {
        const err = new Error();
        err.statusCode = 404;
        throw err;
    }
};

export default force404AMP;
