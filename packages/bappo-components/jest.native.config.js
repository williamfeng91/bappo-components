const jestConfig = require('@bappo/scripts/config').jest;

module.exports = Object.assign(jestConfig, {
  testMatch: ['**/__tests__/**/*.(native|ios|android).(js|jsx|ts|tsx)'],
});
