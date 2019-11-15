import VideoArticleComponent from './component';
import withCorrectHref from '../../../common/hocs/withCorrectHref';

const VideoArticle = props => {
    return (
        <VideoArticleComponent
            description={props.description}
            imgSrc={props.imgSrc}
            href={props.href}
        />
    );
};

export default withCorrectHref(VideoArticle);
