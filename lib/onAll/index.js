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
 * Subscribes to all documents in a collection.
 *
 * ```ts
 * import { onAll, collection } from 'typesaurus'
 *
 * type User = { name: string }
 * const users = collection<User>('users')
 *
 * onAll(users, allUsers => {
 *   console.log(allUsers.length)
 *   //=> 420
 *   console.log(allUsers[0].ref.id)
 *   //=> '00sHm46UWKObv2W7XK9e'
 *   console.log(allUsers[0].data)
 *   //=> { name: 'Sasha' }
 * })
 * ```
 *
 * @param collection - The collection to get all documents from
 * @param onResult - The function which is called with all documents array when
 * the initial fetch is resolved or the collection updates.
 * @param onError - The function is called with error when request fails.
 */
function onAll(collection, onResult, onError) {
    return adaptor_1.default()
        .collection(collection.path)
        .onSnapshot(firebaseSnap => {
        const docs = firebaseSnap.docs.map(d => doc_1.doc(ref_1.ref(collection, d.id), data_1.wrapData(d.data())));
        onResult(docs);
    }, onError);
}
exports.default = onAll;
//# sourceMappingURL=index.js.map