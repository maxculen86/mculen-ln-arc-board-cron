//el parametro deben ser las props del
//componente que está envuelto en el hoc
//fusion:context o fusion:consumer
function createCorrectHref(propsWithContext, href) {
    const isDev = propsWithContext.siteProperties.isDev;
    return `${propsWithContext.contextPath}${
        isDev ? `/${propsWithContext.arcSite}` : ''
    }${href}${isDev ? '?_website=' + propsWithContext.arcSite : ''}`;
}
export default { createCorrectHref: createCorrectHref };
