export type Patterns<T, U> = [T, () => U][];
export type DefaultCasePattern<U> = ['_', () => U];

export default function match<T>(valueToMatch: T) {
  return function <U>(defaultCase: DefaultCasePattern<U>, ...patterns: Patterns<T, U>) {
    const defaultCaseValue = defaultCase[1];
    for (let i = 0; i < patterns.length; i++) {
      const [caseKey, caseValue] = patterns[i];
      if (Object.is(caseKey, valueToMatch)) {
        return caseValue();
      }
    }
    return defaultCaseValue();
  };
}
