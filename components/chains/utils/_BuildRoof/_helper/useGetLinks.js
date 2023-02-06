import { useContent } from 'fusion:content';

const useGetLinks = ({ navigationSection = '' }) => {
    const { children = [] } =
        useContent({
            source:
                navigationSection && navigationSection.trim()
                    ? 'navigationSource'
                    : null,
            query: {
                hierarchy: navigationSection,
                website: 'la-nacion-ar'
            },
            filter: `
            children {
                _id
                name
                display_name
                node_type
                url
            }
        `
        }) || {};

    return children.map(
        ({
            url,
            node_type: nodeType,
            name,
            display_name: displayName,
            _id
        } = {}) => {
            const target = '_blank';

            if (nodeType === 'link') {
                return {
                    text: displayName,
                    href: url,
                    target
                };
            }

            return {
                text: name,
                href: `${_id}/`,
                target
            };
        }
    );
};

export default useGetLinks;
