const computeSegment = (
    clientId,
    { testDigits = [], controlDigits = [] } = {}
) => {
    if (!clientId) return null;

    const lastDigit = String(clientId).slice(-1);
    const includesDigit = list => list.map(String).includes(lastDigit);

    if (includesDigit(testDigits)) return 'test';
    if (includesDigit(controlDigits)) return 'control';
    return null;
};

export default computeSegment;
