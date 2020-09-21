import {Command, flags} from '@oclif/command'
import axios from 'axios'
import chalk from 'chalk'
import { Auth } from '../auth'

export default class Logout extends Command {
  static description = 'Logout from my-courses application'
  static args = []

  async run() {
    const {args} = this.parse(Logout)
    try {
      await axios.post(`http://127.0.0.1:5000/logout`, {})
      await Auth.logout()
      this.log(`${chalk.green('[SUCCESS]')} You are logged out`)
    } catch(err) {
      this.log(`${chalk.red('[FAILED]')} ${err.message}`)
    }
  }
}
