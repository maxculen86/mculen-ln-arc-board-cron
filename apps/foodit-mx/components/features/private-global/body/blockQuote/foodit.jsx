import React from 'react';

export function BlockQuote({
    data: { content_elements: contentElements = [], subtype }
}) {
    const { content } = contentElements.length === 0 ? {} : contentElements[0];

    if (!content || subtype !== 'blockquote') return <></>;

    return (
        <blockquote className="w-100 px-32 flex ai-start gap-8">
            <hr className="h-100 border border-accent-maiz" />
            <p
                className="roboto-bold italic text-16 text-18_md"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </blockquote>
    );
}

export default BlockQuote;
