import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import chalk from 'chalk'
import { Auth } from '../auth'

const { API_PATH } = require('../../config.js');

export default class Login extends Command {
  static description = 'Login to my-courses application'
  static args = [{name: 'name'}]

  async run() {
    const {args} = this.parse(Login)
    try {
      let name: string = args.name
      let password: string
      if (!name) {
        name = await cli.prompt('Name')
      }
      password = await cli.prompt('Password', {type: 'hide'})
      const response = await axios.post(`${API_PATH}/login`, { name: name, password: password })
      await Auth.login(response.headers['authorization'])
      this.log(`${chalk.green('[SUCCESS]')} You are logged in`)
    } catch(err) {
      if (err.response.status === 401) {
        this.log(`${chalk.red('[FAILED]')} Invalid name or password`)
      } else {
          this.log(`${chalk.red('[ERROR]')} ${err.message}`)
      }
    }
  }
}
