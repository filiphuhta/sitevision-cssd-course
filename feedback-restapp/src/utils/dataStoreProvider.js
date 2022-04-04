import storage from '@sitevision/api/server/storage';
import logUtil from '@sitevision/api/server/LogUtil';
const propertyStore = storage.getCollectionDataStore("feedbackStore");

export const add = (data) => {
    let result;
    try {
        result = propertyStore.add(data);
        propertyStore.instantIndex(result.dsid);
    } catch (err) {
        logUtil.info("Could not write to DataStore");
    }
    return result;
}

export const getPrevSearches = () => {
    return propertyStore.find('*').toArray();
}