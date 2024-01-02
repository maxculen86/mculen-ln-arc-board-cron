export class BackendLnInfo extends Error {
    constructor(message, type) {
        super(message, type);
        this.name = BackendLnInfo.name;
        this.customInfoType = type;
    }
}

export default BackendLnInfo;
