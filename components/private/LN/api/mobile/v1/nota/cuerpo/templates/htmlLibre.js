const htmlCuerpo = dataNota => {
    const htmlContent = dataNota.content_elements.find(
        e => e.type === 'raw_html'
    );
    const buf = Buffer.from(htmlContent.content).toString('base64');
    return buf;
};

export default htmlCuerpo;
