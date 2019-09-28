'use strict'
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
 * Subscribes to a collection query built using query objects ({@link order | order}, {@link where | where}, {@link limit | limit}).
 *
 * ```ts
 * import { query, limit, order, startAfter, collection } from 'typesaurus'
 *
 * type Contact = { name: string; year: number }
 * const contacts = collection<Contact>('contacts')
 *
 * onQuery(contacts, [
 *   order('year', 'asc', [startAfter(2000)]),
 *   limit(2)
 * ], bornAfter2000 => {
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
 * @param onResult - The function which is called with the query result when
 * the initial fetch is resolved or the query result updates.
 * @param onError - The function is called with error when request fails.
 * @returns Function that unsubscribes the listener from the updates
 */
function onQuery(collection, queries, onResult, onError) {
  try {
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
    return paginatedFirestoreQuery.onSnapshot(firestoreSnap => {
      onResult(
        firestoreSnap.docs.map(d =>
          doc_1.doc(
            collection.__type__ === 'collectionGroup'
              ? ref_1.pathToRef(d.ref.path)
              : ref_1.ref(collection, d.id),
            data_1.wrapData(d.data())
          )
        )
      )
    }, onError)
  } catch (err) {
    setTimeout(() => onError && onError(err))
    return () => {}
  }
}
exports.default = onQuery
//# sourceMappingURL=index.js.map
