module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(png|svg|pdf|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)'],
    transformIgnorePatterns: ['<rootDir>/node_modules/', 'dist', 'build'],
}
