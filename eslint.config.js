import { configApp } from '@adonisjs/eslint-config'
export default configApp({
    rules: {
        'semi': ['error', 'always', { 'omitLastInOneLineBlock': true, 'omitLastInOneLineClassBody': true }],
        'prettier/prettier': ['error', { 'semi': true }],
    }
})
