const getWebFont = ({ font, deployment, contextPath }) =>
    `${deployment(contextPath + font)}`;

export default getWebFont;
