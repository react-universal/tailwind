import { evaluateMediaQueryConstrains } from '../evaluators/at-rule.evaluator';
import { declarationAsStyle } from '../evaluators/declaration.evaluator';
import { parser } from '../lib';
import type { EvaluatorConfig } from '../types';
import {
  GetAtRuleConditionToken,
  GetAtRuleRules,
  GetMediaRuleIdentToken,
} from './at-rule.parsers';
import { DeclarationTokens } from './declaration.parsers';
import { SelectorToken } from './selector.parsers';

export const CssParserRoutine = (target: string, context: EvaluatorConfig) =>
  parser
    .coroutine((run) => {
      const declarations: Record<string, any> = {};
      const firstChar = run(parser.peek);
      if (firstChar === '@') {
        run(GetMediaRuleIdentToken);
        const mediaRuleConstrains = run(GetAtRuleConditionToken);
        if (evaluateMediaQueryConstrains(mediaRuleConstrains, context)) {
          const rule = run(GetAtRuleRules);
          rule.declarations.forEach((declaration) => {
            const style = declarationAsStyle(declaration, context);
            Object.assign(declarations, style);
          });
          return { declarations, selector: rule.selector };
        }
        return { declarations, selector: '' };
      }
      const selector = run(SelectorToken);

      run(DeclarationTokens).forEach((declaration) => {
        const style = declarationAsStyle(declaration, context);
        Object.assign(declarations, style);
      });

      return { selector, declarations };
    })
    .run(target);
