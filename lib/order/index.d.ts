import { FirestoreOrderByDirection } from '../adaptor'
import { Cursor } from '../cursor'
/**
 * The order query type. Used to build query.
 */
export interface OrderQuery<Model, Key extends keyof Model> {
  type: 'order'
  field: Key
  method: FirestoreOrderByDirection
  cursors: Cursor<Model, Key>[] | undefined
}
/**
 * @param field - Apply ascending order on given field
 */
declare function order<Model, Key extends keyof Model>(
  field: Key
): OrderQuery<Model, Key>
/**
 * @param field - Apply ascending order on given field with given cursors
 * @param cursors - Cursors that define pagination rules ({@link startAfter}, {@link startAt}, {@link endBefore} and {@link endAt})
 */
declare function order<Model, Key extends keyof Model>(
  field: Key,
  cursors: Cursor<Model, Key>[]
): OrderQuery<Model, Key>
/**
 * @param field Apply the order to the field
 * @param method Used ordering method ('desc' or 'asc')
 * @param cursors - Cursors that define pagination rules ({@link startAfter}, {@link startAt}, {@link endBefore} and {@link endAt})
 */
declare function order<Model, Key extends keyof Model>(
  field: Key,
  method: FirestoreOrderByDirection,
  cursors?: Cursor<Model, Key>[]
): OrderQuery<Model, Key>
export { order }
