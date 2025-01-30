const mapVideo = ({ _id: id, ...rest }) => ({ id, ...rest });
const carouselBox = ({ videos }, info) => ({
    ...info,
    videos: videos.map(mapVideo)
});

export default carouselBox;
