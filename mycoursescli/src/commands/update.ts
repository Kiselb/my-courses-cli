import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import chalk from 'chalk'
import * as inquirer from 'inquirer'
import { Auth } from '../auth'

inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));

const { API_PATH } = require('../../config.js');

export default class Update extends Command {
  static description = 'Update entity (course, stream or user)'
  static strict = true
  static args = [
      {
        name: 'entity',
        required: true,
        description: 'The type of the updated entity',
        options: ['course', 'stream']
      },
      {
        name: 'id',
        required: true,
        description: 'The id of the updated entity'
      }
  ]

  private async updateCourse(params: any) {
    try {
      const token: string = await Auth.token()
      const response = await axios.put(`${API_PATH}/courses/${params.id}`, { name: params.name, description: params.description }, { headers: { 'Authorization': token }})
      await this.log(`${chalk.green('[SUCCESS]')} Course updated`)
    } catch(err) {
      this.log(`${chalk.red('[ERROR]')} ${err.message}`)
    }
  }
  private async updateStream(params: any) {
    try {
      const token: string = await Auth.token()
      const response = await axios.put(`${API_PATH}/streams/${params.id}`, { name: params.title, start: params.start, finish: params.finish }, { headers: { 'Authorization': token }})
      await this.log(`${chalk.green('[SUCCESS]')} Course updated`)
    } catch(err) {
      this.log(`${chalk.red('[ERROR]')} ${err.message}`)
    }
  }
  async run() {
    const {args} = this.parse(Update)
    const token: string = await Auth.token()
    if (!token) {
      this.log(`${chalk.red('[FAILED]')} You not yet authorized. Use login command`)
      return
    }
    if (args.entity === 'course') {
      const courseParams: any = await inquirer.prompt([
        {
          name: 'name',
          message: 'Course name:',
          validate: (answer) => !!answer
        },
        {
          name: 'description',
          message: 'Course description:',
          type: 'editor',
          validate: (answer) => !!answer
        },
        {
          name: 'confirm',
          message: 'Parameters is valid:',
          type: 'confirm'
        }
      ])
      courseParams.id = args.id
      await this.updateCourse(courseParams)
    } else {
      const streamParams: any = await inquirer.prompt([
        {
          name: 'title',
          message: 'Title:',
          validate: (answer) => !!answer
        },
        {
          name: 'start',
          type: 'datepicker',
          message: 'Stream start date:',
          format: ['DD', '/', 'MM', '/', 'Y']
        },
        {
          name: 'finish',
          type: 'datepicker',
          message: 'Stream finish date:',
          format: ['DD', '/', 'MM', '/', 'Y']
        }
      ])
      streamParams.start = new Date((new Date(streamParams.start)).setUTCHours(0,0,0,0))
      streamParams.finish = new Date((new Date(streamParams.finish)).setUTCHours(0,0,0,0))
      streamParams.id = args.id
      await this.updateStream(streamParams)
    }
  }
}
