export const handleHttpError = response => {
    if (!response.ok) {
        const httpError = {
            message: `HTTP error! status: ${response.status} ${response.statusText}`,
            statusCode: response.status
        };
        throw httpError;
    }
};
