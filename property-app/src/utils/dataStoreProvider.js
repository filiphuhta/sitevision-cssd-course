import storage from '@sitevision/api/server/storage';
const propertyStore = storage.getCollectionDataStore("propertyStore");

export const add = (data) => {
    try {
        const { dsid } = propertyStore.add(data);
        propertyStore.instantIndex(dsid);
    } catch (err) {
        console.error("Could not write to DataStore");
    }
}

export const getPrevSearches = () => {
    return propertyStore.find('*', 5).toArray();
}