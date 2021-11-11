import embedContent from '../../../../common/nota/cuerpo/elements/embed';

const embed = (nodo, dataNota) => {
    return {
        _t: 'p',
        valor: embedContent(nodo, dataNota)
    };
};

embed.type = 'oembed_response';
export default embed;
