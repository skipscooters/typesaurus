"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adaptor_1 = __importDefault(require("../adaptor"));
const ref_1 = require("../ref");
const doc_1 = require("../doc");
const data_1 = require("../data");
/**
 * Creates batch API ({@link set}, {@link update}, {@link remove}) but unlike
 * regular functions do not return promise and perform operations only
 * when `commit` function is called.
 *
 * ```ts
 * import { batch, collection } from 'typesaurus'
 *
 * type Counter = { count: number }
 * const counters = collection<Counter>('counters')
 *
 * const { set, update, remove, commit } = batch()
 *
 * for (let count = 0; count < 500; count++) {
 *   // Each batch can be up to 500 set, update and remove operations
 *   set(counters, count.toString(), { count })
 * }
 *
 * // Set 500 documents
 * commit().then(() => console.log('Done!'))
 * ```
 *
 * @returns Batch API (set, update, remove, commit)
 */
function batch() {
    const firestoreBatch = adaptor_1.default().batch();
    /**
     * Sets a document to the given data.
     *
     * ```ts
     * import { batch, collection } from 'typesaurus'
     *
     * type Counter = { count: number }
     * const counters = collection<Counter>('counters')
     *
     * const { set, commit } = batch()
     *
     * for (let count = 0; count < 500; count++) {
     *   set(counters, count.toString(), { count })
     * }
     *
     * commit()
     * ```
     *
     * @returns The document
     */
    function set(collectionOrRef, idOrData, maybeData) {
        let collection;
        let id;
        let data;
        if (collectionOrRef.__type__ === 'collection') {
            collection = collectionOrRef;
            id = idOrData;
            data = maybeData;
        }
        else {
            const ref = collectionOrRef;
            collection = ref.collection;
            id = ref.id;
            data = idOrData;
        }
        const firestoreDoc = adaptor_1.default()
            .collection(collection.path)
            .doc(id);
        // ^ above
        // TODO: Refactor code above and below because is all the same as in the regular set function
        firestoreBatch.set(firestoreDoc, data_1.unwrapData(data));
        // v below
        return doc_1.doc(ref_1.ref(collection, id), data);
    }
    /**
     * Updates a document.
     *
     * ```ts
     * import { batch, field, collection } from 'typesaurus'
     *
     * type Counter = { count: number, meta: { updatedAt: number } }
     * const counters = collection<Counter>('counters')
     *
     * const { update, commit } = batch()
     *
     * for (let count = 0; count < 500; count++) {
     *   update(counters, count.toString(), { count: count + 1 })
     *   // or using field paths:
     *   update(counters, count.toString(), [
     *     field('count', count + 1),
     *     field(['meta', 'updatedAt'], Date.now())
     *   ])
     * }
     *
     * commit()
     * ```
     *
     * @returns void
     */
    function update(collectionOrRef, idOrData, maybeData) {
        let collection;
        let id;
        let data;
        if (collectionOrRef.__type__ === 'collection') {
            collection = collectionOrRef;
            id = idOrData;
            data = maybeData;
        }
        else {
            const ref = collectionOrRef;
            collection = ref.collection;
            id = ref.id;
            data = idOrData;
        }
        const firebaseDoc = adaptor_1.default()
            .collection(collection.path)
            .doc(id);
        const updateData = Array.isArray(data)
            ? data.reduce((acc, { key, value }) => {
                acc[Array.isArray(key) ? key.join('.') : key] = value;
                return acc;
            }, {})
            : data;
        // ^ above
        // TODO: Refactor code above because is all the same as in the regular update function
        firestoreBatch.update(firebaseDoc, data_1.unwrapData(updateData));
    }
    /**
     * Removes a document.
     *
     * ```ts
     * import { batch, collection } from 'typesaurus'
     *
     * type Counter = { count: number }
     * const counters = collection<Counter>('counters')
     *
     * const { remove, commit } = batch()
     *
     * for (let count = 0; count < 500; count++) {
     *   remove(counters, count.toString())
     * }
     *
     * commit()
     * ```
     *
     * @returns A promise that resolves when the operation is complete
     */
    function remove(collectionOrRef, maybeId) {
        let collection;
        let id;
        if (collectionOrRef.__type__ === 'collection') {
            collection = collectionOrRef;
            id = maybeId;
        }
        else {
            const ref = collectionOrRef;
            collection = ref.collection;
            id = ref.id;
        }
        const firebaseDoc = adaptor_1.default()
            .collection(collection.path)
            .doc(id);
        // ^ above
        // TODO: Refactor code above because is all the same as in the regular update function
        firestoreBatch.delete(firebaseDoc);
    }
    /**
     * Starts the execution of the operations in the batch.
     *
     * @returns A promise that resolves when the operations are finished
     */
    function commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield firestoreBatch.commit();
        });
    }
    return {
        set,
        update,
        remove,
        clear: remove,
        commit
    };
}
exports.batch = batch;
//# sourceMappingURL=index.js.map