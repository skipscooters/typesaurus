"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adaptor_1 = require("../adaptor");
const ref_1 = require("../ref");
/**
 * Converts Typesaurus data to Firestore format. It deeply traverse all the data and
 * converts values to compatible format.
 *
 * @param data - the data to convert
 */
function unwrapData(data) {
    if (data instanceof Date) {
        return adaptor_1.FirestoreTimestamp.fromDate(data);
    }
    else if (data && typeof data === 'object') {
        if (data.__type__ === 'ref') {
            return ref_1.refToFirestoreDocument(data);
        }
        else if (data.__type__ === 'value') {
            const fieldValue = data;
            switch (fieldValue.kind) {
                case 'remove':
                    return adaptor_1.FirestoreFieldValue.delete();
                case 'increment':
                    return adaptor_1.FirestoreFieldValue.increment(fieldValue.number);
                case 'arrayUnion':
                    return adaptor_1.FirestoreFieldValue.arrayUnion(...fieldValue.values);
                case 'arrayRemove':
                    return adaptor_1.FirestoreFieldValue.arrayRemove(...fieldValue.values);
                case 'serverDate':
                    return adaptor_1.FirestoreFieldValue.serverTimestamp();
            }
        }
        const unwrappedObject = Object.assign(Array.isArray(data) ? [] : {}, data);
        Object.keys(unwrappedObject).forEach(key => {
            unwrappedObject[key] = unwrapData(unwrappedObject[key]);
        });
        return unwrappedObject;
    }
    else if (data === undefined) {
        return null;
    }
    else {
        return data;
    }
}
exports.unwrapData = unwrapData;
/**
 * Converts Firestore data to Typesaurus format. It deeply traverse all the
 * data and converts values to compatible format.
 *
 * @param data - the data to convert
 */
function wrapData(data) {
    if (data instanceof adaptor_1.FirestoreDocumentReference) {
        return ref_1.pathToRef(data.path);
    }
    else if (data instanceof adaptor_1.FirestoreTimestamp) {
        return data.toDate();
    }
    else if (data && typeof data === 'object') {
        const wrappedData = Object.assign(Array.isArray(data) ? [] : {}, data);
        Object.keys(wrappedData).forEach(key => {
            wrappedData[key] = wrapData(wrappedData[key]);
        });
        return wrappedData;
    }
    else {
        return data;
    }
}
exports.wrapData = wrapData;
//# sourceMappingURL=index.js.map