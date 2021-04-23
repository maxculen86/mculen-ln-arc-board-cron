const isValidUrlTagA = contentElements => {
    const result =
        contentElements &&
        contentElements.map(element => {
            const transformElement = { ...element };
            const { type, content } = element;
            if (type === 'text' && content) {
                const regexTagA = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/gim;
                const regexValidHref = /(?:href=(["'\\])+((?:(?:https?|http?):\/\/)?((?:[a-z]+)(?:\.(?:[a-z-0-9]-*)*[a-z-0-9]+)*(?:\.(?:[a-z]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?||\/[a-z-0-9\S]+)\1)/gim;
                const linkList = content.match(regexTagA);
                linkList &&
                    linkList.forEach(e => {
                        const hasInvalidUrl = !regexValidHref.test(e);
                        if (hasInvalidUrl) {
                            transformElement.content = content.replace(
                                e,
                                '<!-- URL INVALIDA REMOVIDA -->'
                            );
                        }
                    });
            }
            return transformElement;
        });

    return result;
};

export default isValidUrlTagA;
