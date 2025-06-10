function BackendStructuredLog(message, referenceId, additionalDetails) {
    return JSON.stringify({
        log_details: {
            message,
            reference_id: referenceId,
            ...additionalDetails
        }
    });
}

export default BackendStructuredLog;
