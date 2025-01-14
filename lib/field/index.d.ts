import { UpdateValue } from '../value/index'
/**
 * The field type. It contains path to the property and property value.
 */
export interface Field<_Model> {
  key: string | string[]
  value: any
}
declare function field<Model, Key extends keyof Model>(
  key: Key | [Key],
  value: Model[Key] | UpdateValue<Model[Key]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1]
>(
  key: [Key1, Key2],
  value: Model[Key1][Key2] | UpdateValue<Model[Key1][Key2]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1],
  Key3 extends keyof Model[Key1][Key2]
>(
  key: [Key1, Key2, Key3],
  value: Model[Key1][Key2][Key3] | UpdateValue<Model[Key1][Key2][Key3]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1],
  Key3 extends keyof Model[Key1][Key2],
  Key4 extends keyof Model[Key1][Key2][Key3]
>(
  key: [Key1, Key2, Key3, Key4],
  value:
    | Model[Key1][Key2][Key3][Key4]
    | UpdateValue<Model[Key1][Key2][Key3][Key4]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1],
  Key3 extends keyof Model[Key1][Key2],
  Key4 extends keyof Model[Key1][Key2][Key3],
  Key5 extends keyof Model[Key1][Key2][Key3][Key4]
>(
  key: [Key1, Key2, Key3, Key4, Key5],
  value:
    | Model[Key1][Key2][Key3][Key4][Key5]
    | UpdateValue<Model[Key1][Key2][Key3][Key4][Key5]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1],
  Key3 extends keyof Model[Key1][Key2],
  Key4 extends keyof Model[Key1][Key2][Key3],
  Key5 extends keyof Model[Key1][Key2][Key3][Key4],
  Key6 extends keyof Model[Key1][Key2][Key3][Key4][Key5]
>(
  key: [Key1, Key2, Key3, Key4, Key5, Key6],
  value:
    | Model[Key1][Key2][Key3][Key4][Key5][Key6]
    | UpdateValue<Model[Key1][Key2][Key3][Key4][Key5][Key6]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1],
  Key3 extends keyof Model[Key1][Key2],
  Key4 extends keyof Model[Key1][Key2][Key3],
  Key5 extends keyof Model[Key1][Key2][Key3][Key4],
  Key6 extends keyof Model[Key1][Key2][Key3][Key4][Key5],
  Key7 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6]
>(
  key: [Key1, Key2, Key3, Key4, Key5, Key6, Key7],
  value:
    | Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7]
    | UpdateValue<Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1],
  Key3 extends keyof Model[Key1][Key2],
  Key4 extends keyof Model[Key1][Key2][Key3],
  Key5 extends keyof Model[Key1][Key2][Key3][Key4],
  Key6 extends keyof Model[Key1][Key2][Key3][Key4][Key5],
  Key7 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6],
  Key8 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7]
>(
  key: [Key1, Key2, Key3, Key4, Key5, Key6, Key7, Key8],
  value:
    | Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8]
    | UpdateValue<Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1],
  Key3 extends keyof Model[Key1][Key2],
  Key4 extends keyof Model[Key1][Key2][Key3],
  Key5 extends keyof Model[Key1][Key2][Key3][Key4],
  Key6 extends keyof Model[Key1][Key2][Key3][Key4][Key5],
  Key7 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6],
  Key8 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7],
  Key9 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8]
>(
  key: [Key1, Key2, Key3, Key4, Key5, Key6, Key7, Key8, Key9],
  value:
    | Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8][Key9]
    | UpdateValue<Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8][Key9]>
): Field<Model>
declare function field<
  Model,
  Key1 extends keyof Model,
  Key2 extends keyof Model[Key1],
  Key3 extends keyof Model[Key1][Key2],
  Key4 extends keyof Model[Key1][Key2][Key3],
  Key5 extends keyof Model[Key1][Key2][Key3][Key4],
  Key6 extends keyof Model[Key1][Key2][Key3][Key4][Key5],
  Key7 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6],
  Key8 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7],
  Key9 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8],
  Key10 extends keyof Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8][Key9]
>(
  key: [Key1, Key2, Key3, Key4, Key5, Key6, Key7, Key8, Key9, Key10],
  value:
    | Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8][Key9][Key10]
    | UpdateValue<
        Model[Key1][Key2][Key3][Key4][Key5][Key6][Key7][Key8][Key9][Key10]
      >
): Field<Model>
export default field
