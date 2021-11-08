import CustomRecetaList from '../elements/customRecetaList';
import DefaultCuerpo from '../../../../common/nota/cuerpo/templates/default';

const recetaCuerpo = dataNota => {
    const resp = [];
    const { _id: idNota, content_elements: contentElements } = dataNota;

    const ingredientes = contentElements.filter(
        v => v.type === 'custom_embed' && v.subtype === 'custom-ingrediente'
    );
    const preparaciones = contentElements.filter(
        v => v.type === 'custom_embed' && v.subtype === 'custom-preparacion'
    );

    ingredientes.forEach(element => {
        resp.push(CustomRecetaList(element, 'ingredientes'));
    });
    preparaciones.forEach(element => {
        resp.push(CustomRecetaList(element, 'preparacion'));
    });

    const tip = contentElements.filter(v => v.type !== 'custom_embed');

    const tipRendered = DefaultCuerpo({ _id: idNota, content_elements: tip });
    if (tipRendered) {
        tipRendered.forEach(v => resp.push(v));
    }

    return resp;
};

export default recetaCuerpo;
