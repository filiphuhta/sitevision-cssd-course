import storage from '@sitevision/api/server/storage';
import logUtil from '@sitevision/api/server/LogUtil';
const feedbackStore = storage.getCollectionDataStore("feedbackStore");

export const addData = (data) => {
    let result;
    try {
        result = feedbackStore.add(data);
        feedbackStore.instantIndex(result.dsid);
    } catch (err) {
        logUtil.info("Could not write to DataStore");
    }
    return result;
}

export const getPagesById = (feedbackPageId) => {
    return feedbackStore.find(`ds.analyzed.feedbackPageId:${feedbackPageId}*`).toArray();
}