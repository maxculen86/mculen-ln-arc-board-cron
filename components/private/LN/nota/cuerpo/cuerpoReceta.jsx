import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListIngredients from './listIngredientes';
import ListPreparation from './listPreparacion';
import Tips from './tips';

const Cuerpo = ({ globalContent: { content_elements: contentElements } }) => {
    let ingredients = [];
    let preparation = [];
    const tips = [];

    contentElements.forEach(element => {
        if (element.type === 'custom_embed') {
            const { items, titleList } = element.embed.config;
            switch (element.subtype) {
                case 'custom-ingrediente': {
                    const ings = [];
                    items.map(item => ings.push(item));
                    ingredients = [
                        ...ingredients,
                        {
                            title: titleList,
                            items: ings
                        }
                    ];
                    break;
                }
                case 'custom-preparacion': {
                    const prep = [];
                    items.map(item => prep.push(item));
                    preparation = [
                        ...preparation,
                        {
                            title: titleList,
                            items: prep
                        }
                    ];
                    break;
                }
                default:
                    break;
            }
        } else if (element.content.length > 10) {
            tips.push({ element });
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
        content_elements: PropTypes.array.isRequired
    }).isRequired
};

export default Cuerpo;
