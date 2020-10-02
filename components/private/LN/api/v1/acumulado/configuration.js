import get from 'lodash.get';

const configuration = configuration => {
    const resp = {};
    resp.headerClass = get(configuration, 'header_class_name', null);
    resp.backgroundColor = get(configuration, 'background_color', null);
    resp.navigationColor = get(configuration, 'navigation_color', null);
    resp.colorTags = get(configuration, 'navigation_color_tags', null);
    resp.imagen = get(configuration, 'id_logo_image', null);

    return resp;
};

export default configuration;
