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
const doc_1 = require("../doc");
const ref_1 = require("../ref");
const data_1 = require("../data");
/**
 * Sets a document to the given data.
 *
 * ```ts
 * import { set, collection } from 'typesaurus'
 *
 * type User = { name: string }
 * const users = collection<User>('users')
 *
 * set(users, '00sHm46UWKObv2W7XK9e', { name: 'Sasha Koss' }).then(sasha => {
 *   console.log(sasha.data)
 *   //=> { name: 'Sasha Koss' }
 * })
 * ```
 *
 * You can also preseve current fields not specified by set:
 *
 * ```ts
 * import { set, value, get, collection } from 'typesaurus'
 *
 * type User = { name: string, registedAt: Date }
 * const users = collection<User>('users')
 *
 * set(users, '00sHm46UWKObv2W7XK9e', {
 *   name: 'Sasha',
 *   registedAt: value('serverDate')
 * },
 *
 * set(
 *   users,
 *  '00sHm46UWKObv2W7XK9e',
 *   { name: 'Sasha Koss' },
 *   { merge: true }
 * )
 *   .then(({ ref }) => get(ref))
 *   .then(console.log)
 *   //=> { name: 'Sasha Koss', registedAt: Thu Aug 15 2019 16:16:56 GMT+0200 (Central European Summer Time) }
 * ```
 *
 * @returns A promise to the document
 */
function set(collectionOrRef, idOrData, dataOrOptions, maybeOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        let collection;
        let id;
        let data;
        let options;
        if (collectionOrRef.__type__ === 'collection') {
            collection = collectionOrRef;
            id = idOrData;
            data = dataOrOptions;
            options = maybeOptions;
        }
        else {
            const ref = collectionOrRef;
            collection = ref.collection;
            id = ref.id;
            data = idOrData;
            options = dataOrOptions;
        }
        const firestoreDoc = adaptor_1.default()
            .collection(collection.path)
            .doc(id);
        yield firestoreDoc.set(data_1.unwrapData(data), options);
        return doc_1.doc(ref_1.ref(collection, id), data);
    });
}
exports.default = set;
//# sourceMappingURL=index.js.map