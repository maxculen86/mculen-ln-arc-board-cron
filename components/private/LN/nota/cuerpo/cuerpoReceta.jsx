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
        } else if (element.content) {
            tips.push({ element });
        }
    });

    if (ingredients.length < 1 && preparation.length < 1 && tips.length < 1)
        return <></>;
    return (
        <>
            <div className="row">
                {ingredients.length > 0 ? (
                    <div className="col-tablet-3 _ingredients">
                        <ListIngredients ingredients={ingredients} />
                    </div>
                ) : (
                    <></>
                )}

                {preparation.length > 0 ? (
                    <div className="col-tablet-8 offset-tablet-1 _preparation">
                        <ListPreparation preparation={preparation} />
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {tips.length > 0 ? (
                <div className="row">
                    <Tips size="--m" title="Tip" paragraphs={tips} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.array.isRequired
    }).isRequired
};

export default Cuerpo;
