import firestore from '../adaptor'
import get from '../get'
import { Collection } from '../collection'
import { Ref, ref, pathToRef } from '../ref'
import { Doc, doc } from '../doc'
import { wrapData, unwrapData } from '../data'
import set from '../set'
import update, { ModelUpdate } from '../update'
import { Field } from '../field'
import remove from '../remove'
import { CollectionGroup } from '../group'
import { Query, FirebaseQuery, query } from '../query'
import { Cursor, CursorMethod } from '../cursor'

/**
 * The Transaction API type.
 */
export type TransactionAPI = {
  get: typeof get
  set: typeof set
  update: typeof update
  remove: typeof remove
  clear: typeof remove
  query: typeof query
}

/**
 * The transaction body function type.
 */
export type TransactionFunction<T> = (api: TransactionAPI) => Promise<T>

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
export function transaction<T>(transactionFn: TransactionFunction<T>): Promise<T> {
  return firestore().runTransaction(t => {
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
    async function get<Model>(
      collectionOrRef: Collection<Model> | Ref<Model>,
      maybeId?: string
    ): Promise<Doc<Model> | undefined> {
      let collection: Collection<Model>
      let id: string

      if (collectionOrRef.__type__ === 'collection') {
        collection = collectionOrRef as Collection<Model>
        id = maybeId as string
      } else {
        const ref = collectionOrRef as Ref<Model>
        collection = ref.collection
        id = ref.id
      }

      const firestoreDoc = firestore()
        .collection(collection.path)
        .doc(id)
      // ^ above
      // TODO: Refactor code above and below because is all the same as in the regular get function
      const firestoreSnap = await t.get(firestoreDoc)
      // v below
      const firestoreData = firestoreSnap.data()
      const data = firestoreData && (wrapData(firestoreData) as Model)
      return data ? doc(ref(collection, id), data) : undefined
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
    async function set<Model>(
      collectionOrRef: Collection<Model> | Ref<Model>,
      idOrData: string | Model,
      maybeData?: Model
    ): Promise<Doc<Model>> {
      let collection: Collection<Model>
      let id: string
      let data: Model

      if (collectionOrRef.__type__ === 'collection') {
        collection = collectionOrRef as Collection<Model>
        id = idOrData as string
        data = maybeData as Model
      } else {
        const ref = collectionOrRef as Ref<Model>
        collection = ref.collection
        id = ref.id
        data = idOrData as Model
      }

      const firestoreDoc = firestore()
        .collection(collection.path)
        .doc(id)
      // ^ above
      // TODO: Refactor code above and below because is all the same as in the regular set function
      await t.set(firestoreDoc, unwrapData(data))
      // v below
      return doc(ref(collection, id), data)
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
    async function update<Model>(
      collectionOrRef: Collection<Model> | Ref<Model>,
      idOrData: string | Field<Model>[] | ModelUpdate<Model>,
      maybeData?: Field<Model>[] | ModelUpdate<Model>
    ): Promise<void> {
      let collection: Collection<Model>
      let id: string
      let data: Model

      if (collectionOrRef.__type__ === 'collection') {
        collection = collectionOrRef as Collection<Model>
        id = idOrData as string
        data = maybeData as Model
      } else {
        const ref = collectionOrRef as Ref<Model>
        collection = ref.collection
        id = ref.id
        data = idOrData as Model
      }

      const firebaseDoc = firestore()
        .collection(collection.path)
        .doc(id)
      const updateData = Array.isArray(data)
        ? data.reduce(
            (acc, { key, value }) => {
              acc[Array.isArray(key) ? key.join('.') : key] = value
              return acc
            },
            {} as { [key: string]: any }
          )
        : data
      // ^ above
      // TODO: Refactor code above because is all the same as in the regular update function
      await t.update(firebaseDoc, unwrapData(updateData))
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
    async function remove<Model>(
      collectionOrRef: Collection<Model> | Ref<Model>,
      maybeId?: string
    ): Promise<void> {
      let collection: Collection<Model>
      let id: string

      if (collectionOrRef.__type__ === 'collection') {
        collection = collectionOrRef as Collection<Model>
        id = maybeId as string
      } else {
        const ref = collectionOrRef as Ref<Model>
        collection = ref.collection
        id = ref.id
      }

      const firebaseDoc = firestore()
        .collection(collection.path)
        .doc(id)
      // ^ above
      // TODO: Refactor code above because is all the same as in the regular update function
      await t.delete(firebaseDoc)
    }

    /**
     * Queries a collection.
     * 
     * TODO: Add comments and tests.
     */
    async function query<Model>(
      collection: Collection<Model> | CollectionGroup<Model>,
      queries: Query<Model, keyof Model>[]
    ): Promise<Doc<Model>[]> {
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
                unwrapData(value)
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
              ? firestore().collectionGroup(collection.path)
              : firestore().collection(collection.path),
          cursors: []
        } as {
          firestoreQuery: FirebaseQuery
          cursors: Cursor<Model, keyof Model>[]
        }
      )
    
      const groupedCursors = cursors.reduce(
        (acc, cursor) => {
          let methodValues = acc.find(([method]) => method === cursor.method)
          if (!methodValues) {
            methodValues = [cursor.method, []]
            acc.push(methodValues)
          }
          methodValues[1].push(unwrapData(cursor.value))
          return acc
        },
        [] as [CursorMethod, any[]][]
      )
    
      const paginatedFirestoreQuery =
        cursors.length && cursors.every(cursor => cursor.value !== undefined)
          ? groupedCursors.reduce((acc, [method, values]) => {
              return acc[method](...values)
            }, firestoreQuery)
          : firestoreQuery
    
      // ^ above
      // TODO: Refactor code above and below because is all the same as in the regular query function
      const firebaseSnap = await t.get(paginatedFirestoreQuery)
      // v below
    
      return firebaseSnap.docs.map(d =>
        doc(
          collection.__type__ === 'collectionGroup'
            ? pathToRef(d.ref.path)
            : ref(collection, d.id),
          wrapData(d.data()) as Model
        )
      )
    }

    return transactionFn({ get, set, update, remove, clear: remove, query })
  })
}
