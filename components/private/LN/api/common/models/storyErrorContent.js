import BackEndErrorApiLogs from './baseApiErrorLog'

export class StoryErrorContent extends BackEndErrorApiLogs {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
export default StoryErrorContent;
