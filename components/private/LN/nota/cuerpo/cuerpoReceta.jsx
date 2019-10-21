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
        switch (element.type) {
            case 'custom_embed': {
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
                break;
            }
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

            <div className="row subtitulos">
                {contentElements.map(element => {
                    if (element.type === 'header') {
                        if (element.content.length > 10) {
                            switch (element.level) {
                                case 1: {
                                    return <h1>{element.content}</h1>;
                                }
                                case 2: {
                                    return <h2>{element.content}</h2>;
                                }
                                case 3: {
                                    return <h3>{element.content}</h3>;
                                }
                                case 4: {
                                    return <h4>{element.content}</h4>;
                                }
                                case 5: {
                                    return <h5>{element.content}</h5>;
                                }
                                case 6: {
                                    return <h6>{element.content}</h6>;
                                }
                                default:
                                    break;
                            }
                        }
                    }
                    return null;
                })}
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
