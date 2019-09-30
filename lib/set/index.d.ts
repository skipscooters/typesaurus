import { Collection } from '../collection'
import { Doc } from '../doc'
import { Ref } from '../ref'
interface SetOptions {
  merge?: boolean
}
/**
 * @param ref - the reference to the document to set
 * @param options - { merge: boolean (default: false) }
 */
declare function set<Model>(
  ref: Ref<Model>,
  data: Model,
  options?: SetOptions
): Promise<Doc<Model>>
/**
 * @param collection - the collection to set document in
 * @param id - the id of the document to set
 * @param data - the document data
 * @param options - { merge: boolean (default: false) }
 */
declare function set<Model>(
  collection: Collection<Model>,
  id: string,
  data: Model,
  options?: SetOptions
): Promise<Doc<Model>>
export default set
