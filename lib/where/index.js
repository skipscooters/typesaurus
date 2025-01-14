'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
/**
 * Creates where query.
 *
 * ```ts
 * import { where, ref, query, collection, Ref } from 'typesaurus'
 *
 * type User = { name: string }
 * type Order = { user: Ref<User>, item: string }
 * const users = collection<User>('users')
 * const orders = collection<User>('orders')
 *
 * query(orders, [where('user', '==', ref(users, '00sHm46UWKObv2W7XK9e')])
 *   .then(userOrders => {
 *     console.log(userOrders.length)
 *     //=> 42
 *   })
 * // Or using key paths:
 * query(orders, [where(['address', 'city'], '==', 'Moscow'])
 * ```
 *
 * @param field - The field or key path to query
 * @param filter - The filter operation ('<', '<=', '==', '>=' or '>')
 * @param value - The value to pass to the operation
 * @returns The where query object
 */
function where(field, filter, value) {
  return {
    type: 'where',
    field,
    filter,
    value
  }
}
exports.where = where
/**
 * Creates where query with array-contains filter operation.
 *
 * ```ts
 * import { untypedWhereArrayContains, query, collection } from 'typesaurus'
 *
 * type User = {
 *   name: string,
 *   interests: string[]
 * }
 *
 * const users = collection<User>('users')
 *
 * query(users, [untypedWhereArrayContains('interests', 'snowboarding'])
 *   .then(snowborders => {
 *     console.log(snowboarders.length)
 *     //=> 42
 *   })
 * ```
 *
 * @param field - The field or key path to query
 * @param value - The value to pass to the operation
 * @returns The where query object
 */
function untypedWhereArrayContains(field, value) {
  return {
    type: 'where',
    field,
    filter: 'array-contains',
    value
  }
}
exports.untypedWhereArrayContains = untypedWhereArrayContains
//# sourceMappingURL=index.js.map
