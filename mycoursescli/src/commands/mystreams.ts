import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import chalk from 'chalk'
const Table  = require('cli-table')
import { Auth } from '../auth'

const { API_PATH } = require('../../config.js');

export default class Mystreams extends Command {
  static description = 'Display list of private streams'
  static args = []

  async run() {
    const {args} = this.parse(Mystreams)

    const token: string = await Auth.token()
    if (!token) {
      this.log(`${chalk.red('[FAILED]')} You not yet authorized. Use login command`)
      return
    }
    const response = await axios.get(`${API_PATH}/streams`, { headers: { 'Authorization': token }})
    const table = new Table({
      head: [
        chalk.blueBright('_id'),
        chalk.blueBright('State'),
        chalk.blueBright('Name'),
        chalk.blueBright('Start'),
        chalk.blueBright('Finish'),
      ]
    })
    for(let i = 0; i < response.data.streams.length; i++) {
      const id = chalk.green(response.data.streams[i]._id)
      const state = chalk.red(response.data.streams[i].StateInfo)
      const name = chalk.black(response.data.streams[i].Name)
      const start = chalk.gray(response.data.streams[i].Start || '<Не задано>')
      const finish = chalk.gray(response.data.streams[i].Finish || '<Не задано>')
      table.push([id, state, name, start, finish])
    }
    this.log(table.toString())
  }
}
