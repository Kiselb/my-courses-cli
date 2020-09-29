import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import axios from 'axios'
import chalk from 'chalk'
import * as inquirer from 'inquirer'
import { Auth } from '../auth'

inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
const { API_PATH } = require('../../config.js');

export default class Add extends Command {
  static description = 'Add entity (course, stream or user) to the database'
  static strict = true
  static args = [
      {
        name: 'entity',
        required: true,
        description: 'The type of the added entity',
        options: ['course', 'stream']
      }
  ]

  private async addCourse(params: any) {
    try {
      const token: string = await Auth.token()
      const response = await axios.post(`${API_PATH}/courses`, { name: params.name, description: params.description}, { headers: { 'Authorization': token }})
      this.log(`${chalk.green('[SUCCESS]')} Course added with Id: ${response.data.courseId}`)
    } catch(err) {
      this.log(`${chalk.red('[ERROR]')} ${err.message}`)
    }
  }
  private async addStream(params: any) {
    try {
      const token: string = await Auth.token()
      const response = await axios.post(`${API_PATH}/courses/${params.courseId}/streams`, { start: params.start, finish: params.finish}, { headers: { 'Authorization': token }})
      this.log(`${chalk.green('[SUCCESS]')} Stream added with Id: ${response.data.streamId}`)
    } catch(err) {
      this.log(`${chalk.red('[ERROR]')} ${err.message}`)
    }
  }
  async run() {
    const {args} = this.parse(Add)
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
        }
      ])
      await this.addCourse(courseParams)
    } else {
      const streamParams: any = await inquirer.prompt([
        {
          name: 'courseId',
          message: 'Course Id:',
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
      await this.addStream(streamParams)
    }
  }
}
