import get from '../../../../common/utils/get';

const configuration = config => {
    const resp = {
        headerClass: get(config, 'header_class_name', null),
        backgroundColor: get(config, 'background_color', null),
        navigationColor: get(config, 'navigation_color', null),
        colorTags: get(config, 'navigation_color_tags', null),
        imagen: get(config, 'id_logo_image', null)
    };

    return resp;
};

export default configuration;
