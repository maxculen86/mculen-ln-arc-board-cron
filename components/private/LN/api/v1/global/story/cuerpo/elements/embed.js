import embedContent from '../../../../common/story/cuerpo/elements/embed';

const embed = (nodo, dataNota) => {
    return {
        _t: 'p',
        valor: embedContent(nodo, dataNota)
    };
};
export default embed;
