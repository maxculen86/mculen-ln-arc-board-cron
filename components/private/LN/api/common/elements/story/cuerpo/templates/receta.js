import CustomRecetaList from '../elements/customRecetaList';
import DefaultCuerpo from './default';

const recetaCuerpo = (contentElements, components, storyId, dataNota) => {
    const resp = [];

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

    const tipRendered = DefaultCuerpo(tip, components, storyId, dataNota);
    if (tipRendered) {
        tipRendered.forEach(v => resp.push(v));
    }

    return resp;
};

export default recetaCuerpo;
