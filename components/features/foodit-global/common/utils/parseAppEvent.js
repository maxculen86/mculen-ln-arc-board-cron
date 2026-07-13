export const parseAppEvent = (eventData = {}) => {
    const { event, ...params } = eventData;
    return {
        event: event || '',
        eventJsonData: JSON.stringify(params)
    };
};
