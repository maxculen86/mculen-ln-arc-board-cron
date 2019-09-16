import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListIngredients from './listIngredientes';
import ListPreparation from './listPreparacion';
import Tips from './tips';

const Cuerpo = ({ globalContent: { content_elements: contentElements } }) => {
    let ingredients = [];
    let preparation = [];

    contentElements.forEach(element => {
        switch (element.type) {
            case 'custom_embed':
                const { items, titleList } = element.embed.config;
                switch (element.subtype) {
                    case 'custom-ingrediente':
                        let ings = [];
                        items.map(item => ings.push(item));
                        ingredients = [
                            ...ingredients,
                            {
                                title: titleList,
                                items: ings
                            }
                        ];
                        break;
                    case 'custom-preparacion':
                        let prep = [];
                        items.map(item => prep.push(item));
                        preparation = [
                            ...preparation,
                            {
                                title: titleList,
                                items: prep
                            }
                        ];
                        break;
                    default:
                        break;
                }
                break;
            case 'text':
                // Dunno what to do here :(
                break;
            default:
                break;
        }
    });

    return (
        <>
            <div className="row">
                <div className="col-tablet-3 hlp-marginBottom-mobile-40">
                    <ListIngredients ingredients={ingredients} />
                </div>
                <div className="col-tablet-8 offset-tablet-1">
                    <ListPreparation preparation={preparation} />
                </div>
            </div>

            <div className="row hlp-marginBottom-40">
                <Tips
                    size="m"
                    title="Tip"
                    paragraphs={[
                        {
                            title: 'Opcional ',
                            description: `El Stoemp se hace tradicionalmente con puerros (en lugar de los repollitos) pero se pueden agregar las verduras que uno quiera, manteniendo las proporciones: por el 100% del peso de las papas, 50% zanahorias, 50% verdura a elección. Vegetariano. Es ideal para incorporar verduras a los más reticentes.`
                        }
                    ]}
                />
            </div>
        </>
    );
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
