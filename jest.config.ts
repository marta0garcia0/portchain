export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest' 
	// process `*.tsx` files with `ts-jest`
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__ mocks __/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy'
	},
}	