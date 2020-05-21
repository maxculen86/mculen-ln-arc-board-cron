const list = data => {
    //const valor = htmlText(data.content);
    if (!valor) return null;
    console.log('Data content  ', data.content);
    return {
        _t: 'p',
        valor: 'lista'
    };
};
list.type = 'list';
export default list;
