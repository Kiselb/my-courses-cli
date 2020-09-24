mycoursescli
============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mycoursescli.svg)](https://npmjs.org/package/mycoursescli)
[![CircleCI](https://circleci.com/gh/my-courses-cli/mycoursescli/tree/master.svg?style=shield)](https://circleci.com/gh/my-courses-cli/mycoursescli/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/my-courses-cli/mycoursescli?branch=master&svg=true)](https://ci.appveyor.com/project/my-courses-cli/mycoursescli/branch/master)
[![Codecov](https://codecov.io/gh/my-courses-cli/mycoursescli/branch/master/graph/badge.svg)](https://codecov.io/gh/my-courses-cli/mycoursescli)
[![Downloads/week](https://img.shields.io/npm/dw/mycoursescli.svg)](https://npmjs.org/package/mycoursescli)
[![License](https://img.shields.io/npm/l/mycoursescli.svg)](https://github.com/my-courses-cli/mycoursescli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g mycoursescli
$ mycoursescli COMMAND
running command...
$ mycoursescli (-v|--version|version)
mycoursescli/1.0.0 win32-x64 node-v12.16.1
$ mycoursescli --help [COMMAND]
USAGE
  $ mycoursescli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mycoursescli add ENTITY`](#mycoursescli-add-entity)
* [`mycoursescli help [COMMAND]`](#mycoursescli-help-command)
* [`mycoursescli login [NAME]`](#mycoursescli-login-name)
* [`mycoursescli logout`](#mycoursescli-logout)
* [`mycoursescli mycourses`](#mycoursescli-mycourses)
* [`mycoursescli mystreams`](#mycoursescli-mystreams)
* [`mycoursescli update [FILE]`](#mycoursescli-update-file)

## `mycoursescli add ENTITY`

Add entity (course, stream or user) to the database

```
USAGE
  $ mycoursescli add ENTITY

ARGUMENTS
  ENTITY  (course|stream) The type of the added entity
```

_See code: [src\commands\add.ts](https://github.com/my-courses-cli/mycoursescli/blob/v1.0.0/src\commands\add.ts)_

## `mycoursescli help [COMMAND]`

display help for mycoursescli

```
USAGE
  $ mycoursescli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src\commands\help.ts)_

## `mycoursescli login [NAME]`

Login to my-courses application

```
USAGE
  $ mycoursescli login [NAME]
```

_See code: [src\commands\login.ts](https://github.com/my-courses-cli/mycoursescli/blob/v1.0.0/src\commands\login.ts)_

## `mycoursescli logout`

Logout from my-courses application

```
USAGE
  $ mycoursescli logout
```

_See code: [src\commands\logout.ts](https://github.com/my-courses-cli/mycoursescli/blob/v1.0.0/src\commands\logout.ts)_

## `mycoursescli mycourses`

Display list of private courses

```
USAGE
  $ mycoursescli mycourses
```

_See code: [src\commands\mycourses.ts](https://github.com/my-courses-cli/mycoursescli/blob/v1.0.0/src\commands\mycourses.ts)_

## `mycoursescli mystreams`

Display list of private streams

```
USAGE
  $ mycoursescli mystreams
```

_See code: [src\commands\mystreams.ts](https://github.com/my-courses-cli/mycoursescli/blob/v1.0.0/src\commands\mystreams.ts)_

## `mycoursescli update [FILE]`

describe the command here

```
USAGE
  $ mycoursescli update [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\update.ts](https://github.com/my-courses-cli/mycoursescli/blob/v1.0.0/src\commands\update.ts)_
<!-- commandsstop -->
