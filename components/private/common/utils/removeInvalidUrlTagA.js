import logger from './logger';

const isValidUrlTagA = (contentElements, arcSite, url, API_ENV) => {
    const typeElement = {
        text: {
            getErrors: current => {
                const { content } = current;
                const linkList =
                    content.match(
                        new RegExp(
                            /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/,
                            'gim'
                        )
                    ) || [];
                return linkList.filter(e => {
                    return (
                        !new RegExp(
                            /(?:href=(["'\\])+((?:(?:https?|http?):\/\/)?((?:[a-z]+)(?:\.(?:[a-z-0-9]-*)*[a-z-0-9]+)*(?:\.(?:[a-z]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?||\/[a-z-0-9\S]+)\1)/,
                            'gim'
                        ).test(e) && e
                    );
                });
            },
            replace: (current, errors, newValue) => {
                return errors.reduce((acc, e) => {
                    const { content } = acc;
                    return {
                        ...acc,
                        content: content.replace(
                            e,
                            e.replace(new RegExp('<[^>]*>', 'gim'), newValue)
                        )
                    };
                }, current);
            }
        },
        interstitial_link: {
            getErrors: current => {
                return (
                    (!new RegExp(
                        /^(http|https|:\/\/|\.|@){2,}(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/,
                        'gim'
                    ).test(current.url) && [current.url]) ||
                    []
                );
            }
        }
    };

    return (
        contentElements &&
        contentElements.reduce((acc, current) => {
            const { content, type } = current;
            if (content && typeElement[type]) {
                const errors = typeElement[type].getErrors(current);
                /**
                 * TODO: Ver si se necesita enviar warnings por urls mal formadas
                 */
                /* try {
                    if (API_ENV === 'prod' && errors.length) {
                        logger.push(
                            {
                                response: {
                                    request: { method: 'isValidUrlTagA' }
                                },
                                error: {
                                    message: `Error URL mal formato en cuerpo nota: ${errors}`
                                }
                            },
                            { source: 'content/source/articleSourceNota', url },
                            arcSite
                        );
                    }
                } catch (e) {
                    console.log('Error en removeInvalidUrlTagA.js', e.message);
                } */

                const newElement =
                    errors.length &&
                    typeElement[type].replace &&
                    typeElement[type].replace(current, errors, '');
                !errors.length
                    ? acc.push(current)
                    : newElement && acc.push(newElement);
            } else {
                acc.push(current);
            }
            return acc;
        }, [])
    );
};

export default isValidUrlTagA;
