import createStylelintAssert from "../../../testUtils/stylelintAssert"

import rule, { ruleName, messages } from ".."

const stylelintAssert = createStylelintAssert()

describe(ruleName, () => {
  it("true", done => {
    stylelintAssert(rule, {
      ruleName,
      config: true,
      accept: [
        { code: "" },
        { code: "@import \"foo.css\";" },
        { code: "a { color: pink; }" },
        { code: "@media print { a { color: pink; } }" },
        { code: "@import url(x.css)" },
      ],
      reject: [
        {
          code: "a {}",
          message: messages.rejected,
          line: 2,
          column: 3,
        },
        {
          code: "a { }",
          message: messages.rejected,
          line: 1,
          column: 3,
        },
        {
          code: "a {\n}",
          message: messages.rejected,
          line: 1,
          column: 3,
        },
        {
          code: "@media print {}",
          message: messages.rejected,
          line: 1,
          column: 14,
        },
        {
          code: "@media print { a {} }",
          message: messages.rejected,
          line: 1,
          column: 18,
        },
      ],
    }, done)
  })
})
