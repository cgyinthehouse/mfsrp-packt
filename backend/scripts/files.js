import { writeFileSync, readFileSync } from 'node:fs'

const users = [{ name: 'Adam Onra', email: 'adam.ondra@climb.ing' }]

const userJson = JSON.stringify(users)
writeFileSync('backend/users.json', userJson)

const readUserJson = readFileSync('backend/users.json', 'utf-8')
const readUsers = JSON.parse(readUserJson)

console.log(readUsers)
