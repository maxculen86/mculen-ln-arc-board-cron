import get from '../../../components/private/common/utils/get';
const isNotShowcase = articleData => {
    return (
        String(get(articleData, 'label.showcase.text', 'no')).toLowerCase() !==
        'si'
    );
};
export default isNotShowcase;
