import {
  report,
  ruleMessages,
  styleSearch,
  validateOptions
} from "../../utils"

export const ruleName = "color-hex-case"

export const messages = ruleMessages(ruleName, {
  expected: (h, v) => `Expected "${h}" to be "${v}"`,
})

export default function (expectation) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: [
        "lower",
        "upper",
      ],
    })
    if (!validOptions) { return }

    root.eachDecl(decl => {
      const value = decl.value

      styleSearch({ source: value, target: "#" }, match => {

        const hexValue = /^#[0-9A-Za-z]+/.exec(value.substr(match.startIndex))[0]
        const hexValueLower = hexValue.toLowerCase()
        const hexValueUpper = hexValue.toUpperCase()

        if (expectation === "lower" && hexValue === hexValueLower) { return }

        if (expectation === "upper" && hexValue === hexValueUpper) { return }

        const variant = expectation === "lower" ? hexValueLower : hexValueUpper

        report({
          message: messages.expected(hexValue, variant),
          node: decl,
          result,
          ruleName,
        })
      })
    })
  }
}