import embedContent from '../../../../../common/elements/story/cuerpo/elements/embed';

const embed = (nodo, dataNota) => {
    return {
        _t: 'p',
        valor: embedContent(nodo, dataNota)
    };
};
export default embed;
