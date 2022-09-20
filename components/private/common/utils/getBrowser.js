const getBrowser = () => {
    const agent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const dataAgent =
        agent.match(/(opera|chrome|safari|firefox(?=\/))\/?\s*(\d+)/i) || [];

    if (dataAgent[1] === 'Chrome') {
        if (/\bOPR\/(\d+)/.test(agent)) {
            return 'Opera';
        }

        if (/\bEDG\/(\d+)/.test(agent)) {
            return 'Edge';
        }
    }

    return dataAgent[1];
};

export default getBrowser;
