import { parseTWTokens } from '../parsers/tailwind-classes.parser';
import type { CSSValue } from '../types/css.types';
import { format, interpolate } from '../utils/string-utils';

/**
 * Constructs `class` strings conditionally.
 *
 * Clone version of popular libraries like [classnames](https://github.com/JedWatson/classnames) or [clsx](https://github.com/lukeed/clsx).
 * The key advantage of `cx` is that it supports tailwind enhanced class name syntax like grouping and aliases.
 *
 * @group Class Name Generators
 * @param strings
 * @param interpolations
 * @returns
 */
export function cx(strings: TemplateStringsArray, ...interpolations: CSSValue[]): string;

/**
 * Constructs `class` strings conditionally.
 *
 * Clone version of popular libraries like [classnames](https://github.com/JedWatson/classnames) or [clsx](https://github.com/lukeed/clsx).
 * The key advantage of `cx` is that it supports tailwind enhanced class name syntax like grouping and aliases.
 *
 * @group Class Name Generators
 * @param input
 */
export function cx(...input: CSSValue[]): string;

export function cx(
  strings: TemplateStringsArray | CSSValue,
  ...interpolations: CSSValue[]
): string {
  return format(parseTWTokens(interpolate(strings, interpolations)));
}
