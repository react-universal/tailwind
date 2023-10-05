import type { ReMatchResult, ThemeContext, Variant } from '../types/config.types';
import type { __Theme__ } from '../types/theme.types';
import { asRegExp } from '../utils/helpers';

export const createVariantResolver = <Theme extends __Theme__ = __Theme__>(
  variant: Variant<Theme>,
) => {
  const [rawPattern, resolver] = variant;
  const condition = asRegExp(rawPattern);
  return (token: string, context: ThemeContext) => {
    const match = condition.exec(token) as ReMatchResult;
    // console.log('MATCH: ', match, variant);
    if (!match) return null;
    match.$$ = token.slice(match[0].length);
    if (typeof resolver == 'string') {
      return resolver;
    }
    return resolver(match, context);
  };
};
