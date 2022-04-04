import storage from '@sitevision/api/server/storage';
import logUtil from '@sitevision/api/server/LogUtil';
const propertyStore = storage.getCollectionDataStore("feedbackStore");

export const add = (data) => {
    try {
        const { dsid } = propertyStore.add(data);
        propertyStore.instantIndex(dsid);
    } catch (err) {
        logUtil.info("Could not write to DataStore");
    }
}

export const getPrevSearches = () => {
    return propertyStore.find('*').toArray();
}