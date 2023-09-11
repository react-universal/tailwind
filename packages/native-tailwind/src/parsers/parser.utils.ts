import * as P from '@universal-labs/css/parser';
import type { ClassNameToken, ParsedRule } from '../types/parser.types';
import type { RuleParserResolver } from '../types/config.types';

export function parseClassNameTokens(...tokens: ClassNameToken[]): string {
  return tokens.reduce((prev, current, currentIndex) => {
    prev += current.value.n;
    if (currentIndex == tokens.length - 1) return prev;
    return prev;
  }, ``);
}

export function parsedRuleToString(rule: ParsedRule, mediaRules: string[]) {
  const fixedPoints = rule.v.reduce(
    (prev, current) => {
      if (mediaRules.includes(current)) {
        prev.prefix += `${current}:`;
      } else {
        prev.suffix += `:${current}`;
      }
      return prev;
    },
    {
      prefix: '.',
      suffix: '',
    },
  );
  return `${fixedPoints.prefix}${rule.i ? '!' : ''}${rule.n}${fixedPoints.suffix}`;
}

export function createLiteralChoiceParser<T extends string>(keys: T[]): P.Parser<T> {
  return P.choice(keys.map((x) => P.literal(x)));
}

export function createLiteralParser<T extends string>(startsWith: T): RuleParserResolver<T> {
  return P.literal(startsWith);
}
