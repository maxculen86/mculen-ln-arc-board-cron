const htmlCuerpo = contentElements => {
    const htmlContent = contentElements.find(e => e.type === 'raw_html');
    const buf = Buffer.from(htmlContent.content).toString('base64');
    return buf;
};

export default htmlCuerpo;
