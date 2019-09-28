import get from '../get'
import set from '../set'
import update from '../update'
import remove from '../remove'
import { query } from '../query'
/**
 * The Transaction API type.
 */
export declare type TransactionAPI = {
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
export declare type TransactionFunction = (api: TransactionAPI) => any
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
export declare function transaction(
  transactionFn: TransactionFunction
): Promise<any>
