import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import ArticleMain from '../../common/articleTypes/articleMain';
import ComTitle from '../../../common/com-title';

const Index = ({ cantidadNotas, outputType }) => {
    const articles = useContent({
        source: 'liftigniterSource',
        query: { cantidadNotas }
    });

    return articles ? (
        <div className="row interest" id="fin-cuerpo">
            <ComTitle tag="h4" size="--l" content="Te puede interesar" />
            <section
                className="row-gap-tablet-3 row-gap-desksm-3"
                data-is-block="true"
                data-block-name="n_te_puede_interesar"
                data-diagramacion-id="0"
            >
                {articles.map((article, index) => {
                    return (
                        <ArticleMain
                            articleData={article}
                            key={article._id}
                            outputType={outputType}
                            position={index + 1}
                        />
                    );
                })}
            </section>
        </div>
    ) : (
        <></>
    );
};

/* class Index extends React.PureComponent {
    constructor(props) {
        super(props);

        const { cantidadNotas, outputType } = props;

        this.state = { articles: [], outputType };

        this.fetchContent({
            articles: {
                source: 'liftigniterSource',
                query: { cantidadNotas }
            }
        });
    }

    render() {
        const { articles, outputType } = this.state;
        return <ArticleList articles={articles} outputType={outputType} />;
    }
} */

Index.propTypes = {
    outputType: PropTypes.string.isRequired,
    cantidadNotas: PropTypes.number.isRequired
};

export default Consumer(Index);
