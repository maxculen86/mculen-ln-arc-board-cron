import get from '../../../components/private/common/utils/get';

const validateSponsoredLink = data => {
    const withSponsoredLink = get(data, 'label.enlaces_patrocinados.text', '');

    return /si/i.test(withSponsoredLink);
};

export default validateSponsoredLink;
