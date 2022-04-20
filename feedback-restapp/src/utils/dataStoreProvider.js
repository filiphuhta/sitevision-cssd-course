import storage from '@sitevision/api/server/storage';
import logUtil from '@sitevision/api/server/LogUtil';
const feedbackStore = storage.getCollectionDataStore("feedbackStore");

export const add = (data) => {
    let result;
    try {
        result = feedbackStore.add(data);
        feedbackStore.instantIndex(result.dsid);
    } catch (err) {
        logUtil.info("Could not write to DataStore");
    }
    return result;
}

export const getPrevSearches = () => {
    return feedbackStore.find('*').toArray();
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