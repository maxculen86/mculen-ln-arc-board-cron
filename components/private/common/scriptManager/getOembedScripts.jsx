import PropTypes from 'prop-types';
import { FOTOAL100 } from '../utils/subtypes/subtypeHelper';

const getOembedScripts = (
    globalContent = {},
    embedElements = [],
    embedsForNote = []
) => {
    const {
        type,
        subtype,
        content_elements: contentElements = []
    } = globalContent;
    const STORY_TYPE = 'story';
    const OEMBED_TYPE = 'oembed_response';

    return (
        (type === STORY_TYPE &&
            subtype !== FOTOAL100 &&
            contentElements.reduce((acc, element) => {
                const { subtype: _subtype, type: _type } = element;
                const embedType =
                    _type === OEMBED_TYPE &&
                    _subtype &&
                    embedsForNote.find(embed =>
                        embed.includes(
                            (_subtype.includes('facebook') && 'facebook') ||
                                _subtype
                        )
                    );
                embedType &&
                    !acc.some(
                        embed => embed && embed.customElement === embedType
                    ) &&
                    embedElements[embedType] &&
                    acc.push(embedElements[embedType]);
                return acc;
            }, [])) ||
        []
    );
};
export default getOembedScripts;

getOembedScripts.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired,
        subtype: PropTypes.string.isRequired
    }),
    oembedElements: PropTypes.arrayOf(PropTypes.obj),
    embedsForNote: PropTypes.arrayOf(PropTypes.string)
};

getOembedScripts.defaultProps = {
    globalContent: {},
    oembedElements: [],
    embedsForNote: []
};
