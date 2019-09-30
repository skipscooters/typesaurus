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
const ref_1 = require('../ref')
const doc_1 = require('../doc')
const data_1 = require('../data')
/**
 * Performs transaction.
 *
 * ```ts
 * import { transaction, collection } from 'typesaurus'
 *
 * type Counter = { count: number }
 * const counters = collection<Counter>('counters')
 *
 * transaction(async ({ get, set, update, remove }) => {
 *   const { data: { count } } = await get('420')
 *   await set(counter, { count: count + 1 })
 * })
 * ```
 *
 * @param transactionFn - The transaction body function that accepts transaction API
 * @returns Promise that is resolved when transaction is closed
 */
function transaction(transactionFn) {
  return adaptor_1.default().runTransaction(t => {
    /**
     * Retrieves a document from a collection.
     *
     * ```ts
     * import { transaction, collection } from 'typesaurus'
     *
     * type Counter = { count: number }
     * const counters = collection<Counter>('counters')
     *
     * transaction(async ({ get, set }) => {
     *   const counter = await get('420')
     *   //=> { __type__: 'doc', data: { count: 42 }, ... }
     *   await set(counter.ref, { count: counter.data.count + 1 })
     * })
     * ```
     *
     * @returns Promise to the document or undefined if not found
     */
    function get(collectionOrRef, maybeId) {
      return __awaiter(this, void 0, void 0, function*() {
        let collection
        let id
        if (collectionOrRef.__type__ === 'collection') {
          collection = collectionOrRef
          id = maybeId
        } else {
          const ref = collectionOrRef
          collection = ref.collection
          id = ref.id
        }
        const firestoreDoc = adaptor_1
          .default()
          .collection(collection.path)
          .doc(id)
        // ^ above
        // TODO: Refactor code above and below because is all the same as in the regular get function
        const firestoreSnap = yield t.get(firestoreDoc)
        // v below
        const firestoreData = firestoreSnap.data()
        const data = firestoreData && data_1.wrapData(firestoreData)
        return data ? doc_1.doc(ref_1.ref(collection, id), data) : undefined
      })
    }
    /**
     * Sets a document to the given data.
     *
     * ```ts
     * import { transaction, collection } from 'typesaurus'
     *
     * type Counter = { count: number }
     * const counters = collection<Counter>('counters')
     *
     * transaction(async ({ get, set }) => {
     *   const counter = await get('420')
     *   await set(counter.ref, { count: counter.data.count + 1 })
     *   //=> { __type__: 'doc', data: { count: 43 }, ... }
     * })
     * ```
     *
     * @returns A promise to the document
     */
    function set(collectionOrRef, idOrData, maybeData) {
      return __awaiter(this, void 0, void 0, function*() {
        let collection
        let id
        let data
        if (collectionOrRef.__type__ === 'collection') {
          collection = collectionOrRef
          id = idOrData
          data = maybeData
        } else {
          const ref = collectionOrRef
          collection = ref.collection
          id = ref.id
          data = idOrData
        }
        const firestoreDoc = adaptor_1
          .default()
          .collection(collection.path)
          .doc(id)
        // ^ above
        // TODO: Refactor code above and below because is all the same as in the regular set function
        yield t.set(firestoreDoc, data_1.unwrapData(data))
        // v below
        return doc_1.doc(ref_1.ref(collection, id), data)
      })
    }
    /**
     * Updates a document.
     *
     * ```ts
     * import { transaction, field, collection } from 'typesaurus'
     *
     * type Counter = { count: number }
     * const counters = collection<Counter>('counters')
     *
     * transaction(async ({ get, set }) => {
     *   const counter = await get('420')
     *   await update(counter.ref, { count: counter.data.count + 1 })
     *   //=> { __type__: 'doc', data: { count: 43 }, ... }
     *   // Or using field paths:
     *   await update(users, '00sHm46UWKObv2W7XK9e', [
     *     field('name', 'Sasha Koss'),
     *     field(['address', 'city'], 'Moscow')
     *   ])
     * })
     * ```
     *
     * @returns A promise that resolves when operation is finished
     */
    function update(collectionOrRef, idOrData, maybeData) {
      return __awaiter(this, void 0, void 0, function*() {
        let collection
        let id
        let data
        if (collectionOrRef.__type__ === 'collection') {
          collection = collectionOrRef
          id = idOrData
          data = maybeData
        } else {
          const ref = collectionOrRef
          collection = ref.collection
          id = ref.id
          data = idOrData
        }
        const firebaseDoc = adaptor_1
          .default()
          .collection(collection.path)
          .doc(id)
        const updateData = Array.isArray(data)
          ? data.reduce((acc, { key, value }) => {
              acc[Array.isArray(key) ? key.join('.') : key] = value
              return acc
            }, {})
          : data
        // ^ above
        // TODO: Refactor code above because is all the same as in the regular update function
        yield t.update(firebaseDoc, data_1.unwrapData(updateData))
      })
    }
    /**
     * Removes a document.
     *
     * ```ts
     * import { transaction, field, collection } from 'typesaurus'
     *
     * type Counter = { count: number }
     * const counters = collection<Counter>('counters')
     *
     * transaction(async ({ get, remove }) => {
     *   const counter = await get('420')
     *   if (counter === 420) await remove(counter.ref)
     * })
     * ```
     *
     * @returns Promise that resolves when the operation is complete.
     */
    function remove(collectionOrRef, maybeId) {
      return __awaiter(this, void 0, void 0, function*() {
        let collection
        let id
        if (collectionOrRef.__type__ === 'collection') {
          collection = collectionOrRef
          id = maybeId
        } else {
          const ref = collectionOrRef
          collection = ref.collection
          id = ref.id
        }
        const firebaseDoc = adaptor_1
          .default()
          .collection(collection.path)
          .doc(id)
        // ^ above
        // TODO: Refactor code above because is all the same as in the regular update function
        yield t.delete(firebaseDoc)
      })
    }
    /**
     * Queries a collection.
     *
     * TODO: Add comments and tests.
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
        // ^ above
        // TODO: Refactor code above and below because is all the same as in the regular query function
        const firebaseSnap = yield t.get(paginatedFirestoreQuery)
        // v below
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
    return transactionFn({ get, set, update, remove, clear: remove, query })
  })
}
exports.transaction = transaction
//# sourceMappingURL=index.js.map
