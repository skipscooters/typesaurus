"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adaptor_1 = __importDefault(require("../adaptor"));
const doc_1 = require("../doc");
const ref_1 = require("../ref");
const data_1 = require("../data");
/**
 * Subscribes to the diven document.
 *
 * ```ts
 * import { onGet, collection } from 'typesaurus'
 *
 * type User = { name: string }
 * const users = collection<User>('users')
 *
 * onGet(users, '00sHm46UWKObv2W7XK9e', sasha => {
 *   console.log(sasha.ref.id)
 *   //=> '00sHm46UWKObv2W7XK9e'
 *   console.log(sasha.data)
 *   //=> { name: 'Sasha' }
 * })
 * ```
 *
 * @returns Function that unsubscribes the listener from the updates
 */
function onGet(collectionOrRef, idOrOnResult, onResultOrOnError, maybeOnError) {
    let collection;
    let id;
    let onResult;
    let onError;
    if (collectionOrRef.__type__ === 'collection') {
        collection = collectionOrRef;
        id = idOrOnResult;
        onResult = onResultOrOnError;
        onError = maybeOnError;
    }
    else {
        const ref = collectionOrRef;
        collection = ref.collection;
        id = ref.id;
        onResult = idOrOnResult;
        onError = onResultOrOnError;
    }
    const firestoreDoc = adaptor_1.default()
        .collection(collection.path)
        .doc(id);
    return firestoreDoc.onSnapshot(firestoreSnap => {
        const firestoreData = firestoreSnap.data();
        const data = firestoreData && data_1.wrapData(firestoreData);
        onResult(data && doc_1.doc(ref_1.ref(collection, id), data));
    }, onError);
}
exports.default = onGet;
//# sourceMappingURL=index.js.map