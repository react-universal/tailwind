import type { AnyStyle, CompleteStyle } from '@universal-labs/css';
import type { ParsedRule } from '@universal-labs/css/tailwind';
import type { RuleResult, ThemeContext } from '../types/config.types';
import type { SheetEntry } from '../types/css.types';
import type { __Theme__ } from '../types/theme.types';
import { entryAtRuleWrapper, sheetEntryDeclarationsToCss } from '../utils/css-utils';
import { toClassName } from '../utils/string-utils';

export function translateRuleResults(
  rule: RuleResult,
  _parsedRule: ParsedRule,
  _ctx: ThemeContext,
): AnyStyle[] {
  const stylesOrCss: AnyStyle[] = [];
  if (!rule) return stylesOrCss;
  if (typeof rule == 'object') {
    const newRule: any = {};
    for (let key of Object.keys(rule)) {
      const newKey = key.replace(/-([a-z])/g, (k) => k[1]!.toUpperCase()!);
      // @ts-expect-error
      newRule[newKey] = rule[key as keyof CompleteStyle];
    }
    stylesOrCss.push(newRule);
  }
  return stylesOrCss;
}

export function sheetEntriesToCss(
  entries: SheetEntry[],
  screens: __Theme__['screens'] = {},
): string {
  if (!entries) {
    return '';
  }
  return entries
    .map((x) => {
      const className = toClassName(x.rule);
      const valueEntries = sheetEntryDeclarationsToCss(x.declarations);
      return entryAtRuleWrapper(x, `.${className}{${valueEntries}}`, screens);
    })
    .join('\n');
}
