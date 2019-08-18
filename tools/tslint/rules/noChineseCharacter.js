"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var ChineseCharacterRegExp = /.*[\u4e00-\u9fa5]+.*$/m;
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoChineseCharacterWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        description: 'Forbidden the usage of Chinese character',
        optionExamples: ['true'],
        options: null,
        optionsDescription: 'Not configurable.',
        ruleName: 'no-chinese-character',
        type: 'maintainability',
        typescriptOnly: true
    };
    Rule.NO_CHINESE_CHARACTER_IN_STRING = 'No Chinese character in string!';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// tslint:disable-next-line: max-classes-per-file
var NoChineseCharacterWalker = /** @class */ (function (_super) {
    __extends(NoChineseCharacterWalker, _super);
    function NoChineseCharacterWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoChineseCharacterWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            var text = node.getFullText();
            if (ChineseCharacterRegExp.test(text)) {
                _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), Rule.NO_CHINESE_CHARACTER_IN_STRING));
            }
        };
        return ts.forEachChild(sourceFile, cb);
    };
    return NoChineseCharacterWalker;
}(Lint.RuleWalker));
