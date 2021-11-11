import embedContent from '../../../../common/nota/cuerpo/elements/embed';

const embed = (nodo, dataNota) => {
    return {
        _t: 'p',
        valor: embedContent(nodo, dataNota)
    };
};
export default embed;
