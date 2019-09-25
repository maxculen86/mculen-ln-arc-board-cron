import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListIngredients from './listIngredientes';
import ListPreparation from './listPreparacion';
import Tips from './tips';

const Cuerpo = ({ globalContent: { content_elements: contentElements } }) => {
    let ingredients = [];
    let preparation = [];
    let tips = [];

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
                if (element.content.length > 10) {
                    tips.push({ description: element.content });
                }
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

            <div className="row">
                <Tips size="m" title="Tip" paragraphs={tips} />
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
