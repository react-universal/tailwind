import {
  TemplateContext,
  TemplateLanguageService,
} from 'typescript-template-language-service-decorator';
import ts from 'typescript/lib/tsserverlibrary';
import { ConfigurationManager } from './configuration';
import { LanguageServiceLogger } from './logger';
import { StandardTemplateSourceHelper } from './source-helper';
import StandardScriptSourceHelper from 'typescript-template-language-service-decorator/lib/standard-script-source-helper';
import { CreateIntellisenseFn } from '../intellisense/createIntellisense';
import { createCompletionEntries, createCompletionEntryDetails } from '../utils';

export class TailwindLanguageService implements TemplateLanguageService {
  configManager: ConfigurationManager;
  logger: LanguageServiceLogger;
  templateSourceHelper: StandardTemplateSourceHelper;
  intellisense: CreateIntellisenseFn;
  constructor(
    typescript: typeof ts,
    info: ts.server.PluginCreateInfo,
    configManager: ConfigurationManager,
    intellisense: CreateIntellisenseFn,
  ) {
    this.intellisense = intellisense;
    this.configManager = configManager;
    this.logger = new LanguageServiceLogger(info);
    this.templateSourceHelper = new StandardTemplateSourceHelper(
      typescript,
      configManager,
      new StandardScriptSourceHelper(typescript, info.project),
    );
  }

  getCompletionsAtPosition(
    templateContext: TemplateContext,
    position: ts.LineAndCharacter,
  ): ts.WithMetadata<ts.CompletionInfo> {
    let originalList = Array.from(this.intellisense.classesCache.values());
    const templateClasses = new Set(templateContext.text.split(/\s+/).filter(Boolean));
    const isEmptyCompletion = templateContext.text.charAt(position.character - 1) == ' ';
    const prevText = templateContext.text.slice(0, position.character);

    if (isEmptyCompletion) {
      // Filter insertedClasses
      originalList = originalList.filter((i) => !templateClasses.has(i.className));
    }
    if (prevText.length > 0 && !isEmptyCompletion) {
      const prevClasses = prevText.split(/\s+/).filter(Boolean);
      const completion = prevClasses[prevClasses.length - 1]!;
      originalList = originalList.filter(
        (i) => !templateClasses.has(i.className) && i.className.includes(completion),
      );
    }
    return createCompletionEntries(originalList);
  }

  getCompletionEntryDetails(
    context: TemplateContext,
    position: ts.LineAndCharacter,
    name: string,
  ): ts.CompletionEntryDetails {
    const utility = this.intellisense.classesCache.get(name)!;
    return createCompletionEntryDetails(utility);
  }
}
