export type Falsey = false | null | undefined | void | '';
export type MaybeArray<T> = T | T[];

export type StringLike = { toString(): string } & string;

export type ArrayType<T> = T extends (infer Item)[] ? Item : T;

/** @experimental */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type KebabCase<S> = S extends `${infer C}${infer T}`
  ? KebabCase<T> extends infer U
    ? U extends string
      ? T extends Uncapitalize<T>
        ? `${Uncapitalize<C>}${U}`
        : `${Uncapitalize<C>}-${U}`
      : never
    : never
  : S;
