import React, { useEffect } from 'react';
import addEventToDataLayer from '../../LN/common/utils/addEventToDataLayer';

const NewsLetterEventsScript = () => {
    useEffect(() => {
        const handleClick = event => {
            const redirectToNewsletter = event.target.closest(
                '.newsletterbox-button'
            );
            if (redirectToNewsletter) {
                const titleElement = document.querySelector(
                    'h4.text.newsletterbox-title'
                );
                const titleText = titleElement
                    ? titleElement.textContent.trim()
                    : '';

                addEventToDataLayer({
                    event: 'e_linkclick',
                    action: 'newsletter',
                    category: 'nota_ln9',
                    label: titleText
                });
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return null;
};

export default NewsLetterEventsScript;
