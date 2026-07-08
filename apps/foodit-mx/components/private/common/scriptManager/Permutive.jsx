import React from 'react';
import { useAppContext } from 'fusion:context';
import handleCookie from '../../LN/common/utils/handleCookie';

function Permutive() {
    const {
        contextPath,
        deployment,
        layout,
        globalContent: {
            publish_date: publishDate = '',
            credits: { by: creditsBy = [] } = {},
            headlines: { basic: basicHeadline } = {},
            taxonomy: {
                tags = [],
                primary_section: { name: primarySectionName } = {}
            } = {}
        } = {}
    } = useAppContext();

    const { getCookie } = handleCookie();

    const authorNames =
        creditsBy.length &&
        creditsBy.map(author => author.name).filter(Boolean);

    const tagNames = tags.length && tags.map(tag => tag.text).filter(Boolean);

    const article = {
        ...(publishDate && { publishedAt: publishDate }),
        ...(authorNames && authorNames.length && { authors: authorNames }),
        ...(tagNames && tagNames.length && { keywords: tagNames }),
        ...(primarySectionName && { section: primarySectionName }),
        ...(basicHeadline && { title: basicHeadline })
    };
    // TODO: Pedir a Permutive para que la key del objeto "user", pase de "suscribed" a "subscribed".

    return (
        <>
            <script
                id="script-permutive"
                data-layout={layout}
                data-article={JSON.stringify(article)}
                data-get-cookie={getCookie.toString()}
                async
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/Permutive.min.js`
                )}
            />
            <script
                async
                src="https://867f8423-d142-4fd1-ae8d-1a9bbbdf2358.edge.permutive.app/867f8423-d142-4fd1-ae8d-1a9bbbdf2358-web.js"
            />
        </>
    );
}

export default Permutive;
