const force404AMP = ({ outputType = 'default', promise = false }) => {
    const createError = () => {
        if (outputType === 'amp') {
            const err = new Error();
            err.statusCode = 404;
            throw err;
        }
    };

    return (
        (promise &&
            new Promise((resolve, _) =>
                setTimeout(() => resolve(createError), 250)
            )) ||
        createError()
    );
};

export default force404AMP;
