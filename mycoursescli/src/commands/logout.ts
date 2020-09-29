import {Command, flags} from '@oclif/command'
import axios from 'axios'
import chalk from 'chalk'
import { Auth } from '../auth'

const { API_PATH } = require('../../config.js');

export default class Logout extends Command {
  static description = 'Logout from my-courses application'
  static args = []

  async run() {
    const {args} = this.parse(Logout)
    try {
      await axios.post(`${API_PATH}/logout`, {})
      await Auth.logout()
      this.log(`${chalk.green('[SUCCESS]')} You are logged out`)
    } catch(err) {
      this.log(`${chalk.red('[FAILED]')} ${err.message}`)
    }
  }
}
