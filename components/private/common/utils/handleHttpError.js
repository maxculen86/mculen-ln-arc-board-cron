export const handleHttpError = response => {
    if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {
            // NOSONAR
            message: `HTTP error! status: ${response.status} ${response.statusText}`,
            statusCode: response.status
        };
    }
};
