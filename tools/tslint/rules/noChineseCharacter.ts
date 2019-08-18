import * as Lint from 'tslint';
import * as ts from 'typescript';

const ChineseCharacterRegExp = /.*[\u4e00-\u9fa5]+.*$/m;

export class Rule extends Lint.Rules.AbstractRule {

    public static metadata: Lint.IRuleMetadata = {
        description: 'Forbidden the usage of Chinese character',
        optionExamples: ['true'],
        options: null,
        optionsDescription: 'Not configurable.',
        ruleName: 'no-chinese-character',
        type: 'maintainability',
        typescriptOnly: true,
    };

    public static NO_CHINESE_CHARACTER_IN_STRING = 'No Chinese character in string!';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoChineseCharacterWalker(sourceFile, this.getOptions()));
    }

}

// tslint:disable-next-line: max-classes-per-file
class NoChineseCharacterWalker extends Lint.RuleWalker {
    public walk(sourceFile: ts.SourceFile) {
        const cb = (node: ts.Node): void => {
            const text = node.getFullText();
            if (ChineseCharacterRegExp.test(text)) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.NO_CHINESE_CHARACTER_IN_STRING));
            }
        };
        return ts.forEachChild(sourceFile, cb);
    }

}
