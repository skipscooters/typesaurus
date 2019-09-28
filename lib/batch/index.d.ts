import { Collection } from '../collection';
import { Ref } from '../ref';
import { Doc } from '../doc';
import { ModelUpdate } from '../update';
import { Field } from '../field';
/**
 * Creates batch API ({@link set}, {@link update}, {@link remove}) but unlike
 * regular functions do not return promise and perform operations only
 * when `commit` function is called.
 *
 * ```ts
 * import { batch, collection } from 'typesaurus'
 *
 * type Counter = { count: number }
 * const counters = collection<Counter>('counters')
 *
 * const { set, update, remove, commit } = batch()
 *
 * for (let count = 0; count < 500; count++) {
 *   // Each batch can be up to 500 set, update and remove operations
 *   set(counters, count.toString(), { count })
 * }
 *
 * // Set 500 documents
 * commit().then(() => console.log('Done!'))
 * ```
 *
 * @returns Batch API (set, update, remove, commit)
 */
export declare function batch(): {
    set: {
        <Model>(ref: Ref<Model>, data: Model): Doc<Model>;
        <Model_1>(collection: Collection<Model_1>, id: string, data: Model_1): Doc<Model_1>;
    };
    update: {
        <Model_2>(collection: Collection<Model_2>, id: string, data: Field<Model_2>[]): void;
        <Model_3>(ref: Ref<Model_3>, data: Field<Model_3>[]): void;
        <Model_4>(collection: Collection<Model_4>, id: string, data: ModelUpdate<Model_4>): void;
        <Model_5>(ref: Ref<Model_5>, data: ModelUpdate<Model_5>): void;
    };
    remove: {
        <Model_6>(collection: Collection<Model_6>, id: string): void;
        <Model_7>(ref: Ref<Model_7>): void;
    };
    clear: {
        <Model_6>(collection: Collection<Model_6>, id: string): void;
        <Model_7>(ref: Ref<Model_7>): void;
    };
    commit: () => Promise<void>;
};
