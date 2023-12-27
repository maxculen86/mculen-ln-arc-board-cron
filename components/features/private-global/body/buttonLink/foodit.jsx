import React from 'react';
import { Button } from '@ln/foodit-ui-button';

export const BotonLink = ({ data }) => {
    const { url, content } = data || {};

    if (!url || !content) return <></>;

    return (
        <Button
            href={url}
            target="_blank"
            variant="secondary"
            className="as-center mx-auto"
        >
            {content}
        </Button>
    );
};

export default BotonLink;
