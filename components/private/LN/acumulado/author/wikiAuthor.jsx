// TODO: Chequear si se agregan estas reglas al eslint
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/modules/wiki-autor.css';
import '../../../../../resources/dist/css/ln/components/author.css';

// TODO: los siguientes enlaces son para agregar en base

//import '../../../../../resources/dist/css/ln/components/title.css';
import '../../../../../resources/dist/css/ln/components/link.css';
import ComTitle from '../../../common/com-title';
import ComContainer from '../../../common/com-container';
import ComText from '../../../common/com-text';
import ComParagraph from '../../../common/com-paragraph';
import ModDescriptionList from '../../../common/mod-descriptionList';
import ListSocialIcons from '../../../common/list-socialicons';
import ImageAuthor from './imageAuthor';
// import ModWikiAuthor from '../../../common/mod-wikiAuthor';
//import '../../../../../resources/dist/css/ln/base/helpers.css';

const WikiAuthor = ({ data, classesNames, classCondition }) => {
    const {
        byline,
        firstName,
        lastName,
        email,
        role,
        longBio,
        image: { url },
        books,
        podcasts,
        education,
        awards,
        personal_website,
        languages,
        affiliations,
        facebook,
        twitter
    } = data || {};
    console.log("WikiAuthor -> data", data)
    console.log("WikiAuthor -> books", books)

    return (
        <section
            className={`mod-wikiauthor ${classesNames || ''} ${classCondition ||
                ''}`}
        >
            <div className="row">
                <div className="col-12 col-desksm-4">
                    <ImageAuthor url={url} />
                </div>
                <div className="col-12 col-desksm-8">
                    <ComContainer classCondition="--info">
                        <ComTitle tag="h2" content="Nombre Autor" size="--l" />
                        <ComText textname={role} size="--threexs" />
                        <ComContainer>
                            <ModDescriptionList size="--threexs" />
                        </ComContainer>
                        <ComParagraph size="--threexs" content={longBio} />
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Educación"
                                size="--threexs"
                                list={education}
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Reconocimientos"
                                size="--threexs"
                                list={awards}
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Idiomas:"
                                size="--threexs"
                                text={languages}
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Membresías profesionales:"
                                size="--threexs"
                                text={affiliations}
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Publicaciones"
                                size="--threexs"
                                list={books}
                            />
                        </ComContainer>
                        <ComContainer>
                            <ModDescriptionList
                                descriptionTitle="Podscat"
                                size="--threexs"
                                list={podcasts}
                            />
                        </ComContainer>
                    </ComContainer>
                </div>
                <div className="col-12">
                    <ComContainer classCondition="--socialicons">
                        <ComTitle
                            tag="h4"
                            content="Conectar"
                            size="--threexs"
                        />
                        <ListSocialIcons size="--threexs" />
                    </ComContainer>
                </div>
            </div>
        </section>
    );
        // return (
        //   <ModWikiAuthor />
        // <div className="wiki-autor row">
        //     <div className="col-12">
        //         <section id="" className="cont-figure-wiki">
        //             <div href={bioPage} className="figure">
        //                 <picture className="content-pic picture">
        //                     {url && (
        //                         <img src={url} alt="" className="content-img" />
        //                     )}
        //                 </picture>
        //             </div>
        //         </section>
        //         <div className="wiki-calc">
        //             <ComTitle tag="h1" size="--xl" content={byline} />
        //             <label>LA NACION</label>
        //         </div>
        //         <p className="hlp-mobile-none col-12">
        //             {longBio}
        //             {twitter && (
        //                 <span>
        //                     Twitter:&nbsp;
        //                     <a
        //                         href={`https://twitter.com/${twitter}`}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                     >
        //                         {twitter}
        //                     </a>
        //                 </span>
        //             )}
        //         </p>
        //     </div>
        // </div>
        // );
};

WikiAuthor.propTypes = {
    globalContent: PropTypes.shape({
        byline: PropTypes.string.isRequired,
        bio_page: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        longBio: PropTypes.string.isRequired,
        twitter: PropTypes.string.isRequired
    }).isRequired
};

export default WikiAuthor;
