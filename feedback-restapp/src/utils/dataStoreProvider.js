import storage from '@sitevision/api/server/storage';
import logUtil from '@sitevision/api/server/LogUtil';
const feedbackStore = storage.getCollectionDataStore("feedbackStore");

export const getPagesById = (feedbackPageId) => {
    return feedbackStore.find(`ds.analyzed.feedbackPageId:${feedbackPageId}*`).toArray();
}

export const update = (dsid, data) => {
    let result;
    try {
        result = feedbackStore.set(dsid, data);
    } catch (e) {
        logUtil.info("Could not write to DataStore");
    }
    return result;
}