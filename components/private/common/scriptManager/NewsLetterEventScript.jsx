import { useEffect } from 'react';

const NewsLetterEventsScript = () => {
    useEffect(() => {
        window.LN.eventshelper.setEventsNewsLetter();
    }, []);

    return null;
};

export default NewsLetterEventsScript;
