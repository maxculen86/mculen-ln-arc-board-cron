const configuration = configuration => {
    const resp = {};
    
    if (configuration.header_class_name)
        resp.headerClass = configuration.header_class_name;

    if (configuration.background_color)
        resp.backgroundColor = configuration.background_color;

    if (configuration.navigation_color)
        resp.navigationColor = configuration.navigation_color;

    if (configuration.navigation_color_tags)
        resp.colorTags = configuration.navigation_color;

    if (configuration.id_logo_image)
        resp.imagen = configuration.id_logo_image;

    return resp;
};

export default configuration;
