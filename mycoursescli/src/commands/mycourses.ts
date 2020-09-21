import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import chalk from 'chalk'
const Table  = require('cli-table')
import { Auth } from '../auth'

export default class Mycourses extends Command {
  static description = 'Display list of private courses'
  static args = []

  async run() {
    const {args} = this.parse(Mycourses)
    const token: string = await Auth.token()
    if (!token) {
      this.log(`${chalk.red('[FAILED]')} You not yet authorized. Use login command`)
      return
    }
    const response = await axios.get(`http://127.0.0.1:5100/courses`, { headers: { 'Authorization': token }})
    const table = new Table({
      head: [
        chalk.blueBright('_id'),
        chalk.blueBright('State'),
        chalk.blueBright('Name'),
        chalk.blueBright('Description'),
      ]
    })
    for(let i = 0; i < response.data.courses.length; i++) {
      const id = chalk.green(response.data.courses[i]._id)
      const state = chalk.red(response.data.courses[i].State)
      const name = chalk.black(response.data.courses[i].Name)
      const description = chalk.gray(response.data.courses[i].Description.substring(0, 80) + ' ...')
      table.push([id, state, name, description])
    }
    this.log(table.toString())
  }
}
