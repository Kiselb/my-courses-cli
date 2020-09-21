import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

const APPLICATION = "mycourses"
const FILE_NAME = "token.json"

const DIRECTORY: string = path.join(os.homedir(), APPLICATION)
const TOKEN_FILE: string = path.join(DIRECTORY, FILE_NAME)

export class Auth {
    private static async exists(path: string): Promise<boolean> {
        try {
            await fs.promises.access(TOKEN_FILE)
            return true
        } catch(err) {
            return false
        }
    }
    private static async save(token: string) {
        try {
            if (!await Auth.exists(DIRECTORY)) {
                await fs.promises.mkdir(DIRECTORY)
            }
            await fs.promises.writeFile(TOKEN_FILE, token)
        } catch(err) {
            throw new Error("Token file read error")
        }        
    }
    private static async load(): Promise<string> {
        try {
            const data: any = fs.promises.readFile(TOKEN_FILE)
            return data
        } catch(err) {
            return ""
        }
    }
    static async login(token: string) {
        try {
            await Auth.save(token)
        } catch(err) {
            throw new Error(`Login failed: ${err}`)
        }
    }
    static async logout(): Promise<void> {
        try {
            await Auth.save("")
        } catch(err) {
            throw new Error(`Logout failed: ${err}`)
        }
    }
    static async isLogged(): Promise<boolean> {
        try {
            if (await Auth.exists(TOKEN_FILE)) {
                const token = await Auth.load()
                return !!token
            }
            return false
        } catch(err) {
            return false
        }
    }
    static async token(): Promise<string> {
        try {
            if (await Auth.exists(TOKEN_FILE)) {
                const token: string = (await Auth.load()).toString()
                return token
            }
            return ""
        } catch(err) {
            return ""
        }
    }
}
