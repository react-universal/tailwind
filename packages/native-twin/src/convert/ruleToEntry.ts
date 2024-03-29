import { Layer, moveToLayer } from '@universal-labs/css';
import type { ThemeContext } from '../types/config.types';
import type { SheetEntry } from '../types/css.types';
import type { ParsedRule } from '../types/tailwind.types';
import { convert } from '../utils/theme-utils';
import { parsedRuleToClassName } from './ruleToClassName';

/**
 * Converts a parsed rule to a sheet entry based on the given context.
 *
 * @param {ParsedRule} rule - The parsed rule to convert.
 * @param {ThemeContext} context - The context in which the conversion is happening.
 * @return {SheetEntry} The converted sheet entry.
 */
export function parsedRuleToEntry(rule: ParsedRule, context: ThemeContext): SheetEntry {
  if (rule.n == 'group') {
    return {
      className: 'group',
      declarations: [],
      selectors: [],
      precedence: Layer.u,
      important: rule.i,
    };
  }
  if (context.mode === 'web') {
    if (
      (rule.v.includes('ios') || rule.v.includes('android') || rule.v.includes('native')) &&
      !rule.v.includes('web')
    ) {
      return {
        className: parsedRuleToClassName(rule),
        declarations: [],
        selectors: [],
        precedence: Layer.u,
        important: rule.i,
      };
    }
  }
  const result = context.r(rule);
  if (!result) {
    // propagate className as is
    return {
      className: parsedRuleToClassName(rule),
      declarations: [],
      selectors: [],
      precedence: Layer.u,
      important: rule.i,
    };
  }
  const newRule = context.mode === 'web' ? convert(rule, context, Layer.u) : rule;
  result.selectors = newRule.v;
  result.precedence = context.mode === 'web' ? moveToLayer(Layer.u, newRule.p) : rule.p;
  return result;
}
