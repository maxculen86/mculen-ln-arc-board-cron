// import logger from '../../components/private/common/utils/logger';
import logger from '../../../../components/private/common/utils/logger';

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
                API_ENV === 'prod' &&
                    errors.length &&
                    logger.push(
                        {
                            response: { request: { method: 'isValidUrlTagA' } },
                            error: {
                                message: `Error URL mal formato en cuerpo nota: ${errors}`
                            }
                        },
                        { source: 'content/source', url },
                        arcSite
                    );

                console.log('🚀 ~ errors', errors);
                const newElement =
                    errors.length &&
                    typeElement[type].replace &&
                    typeElement[type].replace(current, errors, '');
                console.log('🚀~ newElement', newElement);
                !errors.length
                    ? acc.push(current)
                    : newElement && acc.push(newElement);
            } else {
                acc.push(current);
                console.log('🚀 ~ acc', acc);
            }
            return acc;
        }, [])
    );
};

export default isValidUrlTagA;

// const result =
//     contentElements &&
//     contentElements.map((element, index) => {
//         const transformElement = { ...element };
//         const { type, content } = element;

//         // if (type === 'interstitial_link' && content) {
//         //     console.log('WWWWWWWWWWWWWW2', contentElements);
//         //     // // debugger;
//         //     const regexUrl = new RegExp(
//         //         /^(http|https|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/,
//         //         'gim'
//         //     );

//         //     regexUrl.test(transformElement.url)
//         //         ? console.log('SIII es Validooooo')
//         //         : transformElement[index]
//         // }

//         if (type === 'text' && content) {
//             const linkList = content.match(
//                 new RegExp(
//                     /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/,
//                     'gim'
//                 )
//             );
//             linkList &&
//                 linkList.forEach(e => {
//                     if (
//                         !new RegExp(
//                             /(?:href=(["'\\])+((?:(?:https?|http?):\/\/)?((?:[a-z]+)(?:\.(?:[a-z-0-9]-*)*[a-z-0-9]+)*(?:\.(?:[a-z]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?||\/[a-z-0-9\S]+)\1)/,
//                             'gim'
//                         ).test(e)
//                     ) {
//                         // debugger;
//                         // console.log(
//                         //     '🚀 ~ file: removeInvalidUrlTagA.js ~ line 21 ~ eeeeeeeeee',
//                         //     e
//                         // );

//                         transformElement.content = content.replace(
//                             e,
//                             e.replace(new RegExp('<[^>]*>', 'gim'), '')
//                         );
//                     }
//                 });
//         }
//         return transformElement;
//     });
