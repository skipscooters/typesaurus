import { Ref } from '../ref';
import { Collection } from '../collection';
/**
 * The subcollection function type.
 */
export declare type Subcollection<RefModel, CollectionModel> = (ref: Ref<RefModel> | string) => Collection<CollectionModel>;
/**
 * Creates a subcollection function which accepts parent document reference
 * and returns the subcollection trasnformed into a collection object.
 *
 * ```ts
 * import { subcollection, collection, ref, add } from 'typesaurus'
 *
 * type User = { name: string }
 * type Order = { item: string }
 * const users = collection<User>('users')
 * const userOrders = subcollection<Order, User>('orders')
 *
 * const sashasOrders = userOrders('00sHm46UWKObv2W7XK9e')
 * //=> { __type__: 'collection', path: 'users/00sHm46UWKObv2W7XK9e/orders' }
 * // Also accepts reference:
 * userOrders(ref(users, '00sHm46UWKObv2W7XK9e')))
 *
 * add(sashasOrders, { item: 'Snowboard boots' })
 * ```
 *
 * @param name - The subcollection name
 * @param parentCollection - The parent collection
 * @returns Function which accepts parent document
 */
declare function subcollection<CollectionModel, RefModel>(name: string, parentCollection: Collection<RefModel>): Subcollection<RefModel, CollectionModel>;
export { subcollection };
