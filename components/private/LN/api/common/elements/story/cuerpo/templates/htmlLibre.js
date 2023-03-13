const htmlCuerpo = (...args) => {
    const htmlContent = args[0].find(e => e.type === 'raw_html');
    if (!htmlContent) return '';
    return Buffer.from(htmlContent.content).toString('base64');
};

export default htmlCuerpo;
