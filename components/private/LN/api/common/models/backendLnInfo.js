export class BackendLnInfo extends String {
    constructor(message, type) {
        super(message, type);
        this.name = BackendLnInfo.name;
        this.customInfoType = type;
    }
}

export default BackendLnInfo;
