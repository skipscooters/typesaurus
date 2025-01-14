'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const adaptor_1 = __importDefault(require('../adaptor'))
const doc_1 = require('../doc')
const ref_1 = require('../ref')
const data_1 = require('../data')
/**
 * Queries passed collection using query objects ({@link order}, {@link where}, {@link limit}).
 *
 * ```ts
 * import { query, limit, order, startAfter, collection } from 'typesaurus'
 *
 * type Contact = { name: string; year: number }
 * const contacts = collection<Contact>('contacts')
 *
 * query(contacts, [
 *   order('year', 'asc', [startAfter(2000)]),
 *   limit(2)
 * ]).then(bornAfter2000 => {
 *   console.log(bornAfter2000)
 *   //=> 420
 *   console.log(bornAfter2000[0].ref.id)
 *   //=> '00sHm46UWKObv2W7XK9e'
 *   console.log(bornAfter2000[0].data)
 *   //=> { name: 'Sasha' }
 * })
 * ```
 *
 * @param collection - The collection or collection group to query
 * @param queries - The query objects
 * @returns The promise to the query results
 */
function query(collection, queries) {
  return __awaiter(this, void 0, void 0, function*() {
    const { firestoreQuery, cursors } = queries.reduce(
      (acc, q) => {
        switch (q.type) {
          case 'order': {
            const { field, method, cursors } = q
            acc.firestoreQuery = acc.firestoreQuery.orderBy(
              field.toString(),
              method
            )
            if (cursors) acc.cursors = acc.cursors.concat(cursors)
            break
          }
          case 'where': {
            const { field, filter, value } = q
            const fieldName = Array.isArray(field) ? field.join('.') : field
            acc.firestoreQuery = acc.firestoreQuery.where(
              fieldName,
              filter,
              data_1.unwrapData(value)
            )
            break
          }
          case 'limit': {
            const { number } = q
            acc.firestoreQuery = acc.firestoreQuery.limit(number)
            break
          }
        }
        return acc
      },
      {
        firestoreQuery:
          collection.__type__ === 'collectionGroup'
            ? adaptor_1.default().collectionGroup(collection.path)
            : adaptor_1.default().collection(collection.path),
        cursors: []
      }
    )
    const groupedCursors = cursors.reduce((acc, cursor) => {
      let methodValues = acc.find(([method]) => method === cursor.method)
      if (!methodValues) {
        methodValues = [cursor.method, []]
        acc.push(methodValues)
      }
      methodValues[1].push(data_1.unwrapData(cursor.value))
      return acc
    }, [])
    const paginatedFirestoreQuery =
      cursors.length && cursors.every(cursor => cursor.value !== undefined)
        ? groupedCursors.reduce((acc, [method, values]) => {
            return acc[method](...values)
          }, firestoreQuery)
        : firestoreQuery
    const firebaseSnap = yield paginatedFirestoreQuery.get()
    return firebaseSnap.docs.map(d =>
      doc_1.doc(
        collection.__type__ === 'collectionGroup'
          ? ref_1.pathToRef(d.ref.path)
          : ref_1.ref(collection, d.id),
        data_1.wrapData(d.data())
      )
    )
  })
}
exports.query = query
//# sourceMappingURL=index.js.map
