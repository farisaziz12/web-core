# Components Package `@farisaziz12/web-core/packages/components/src`

## Usage

## Buttons

### Button

```jsx
import React, { Component } from 'react'

import { Button } from 'components'
import 'components/dist/index.css'

class Example extends Component {
  render() {
    return <Button />
  }
}
```

### Button Props

| prop      | type     | description                                   |
| --------- | -------- | --------------------------------------------- |
| className | string   | css class names you want to add to the button |
| hex       | string   | background color in hex format                |
| onClick   | function | function to call when button is clicked       |
| size      | string   | mini, small, default, large, jumbo            |
| style     | object   | object with button styles                     |
| disabled  | boolean  | defines if the button is disabled             |
| center    | boolean  | centers button horizontally                   |
| left      | boolean  | floats button to the left                     |
| right     | boolean  | floats button to the right                    |
| border    | boolean  | hex is used as the border color with no fill  |
| type      | string   | button type (e.g. "submit")                   |
| text      | string   | text that displays on the button              |

### Show Button

Will display and hide any children wrapped inside the component when clicked.

```jsx
import React, { Component } from 'react'

import { ShowButton } from 'components'
import 'components/dist/index.css'

class Example extends Component {
  render() {
    return (
      <ShowButton>
        <h1>Hello World</h1>
      </ShowButton>
    )
  }
}
```

### Show Button Props

Accepts all the same props as the **Button** class as it inherits from it.


## Inputs

### Input

```jsx
import React, { Component } from 'react'

import { Input } from 'components'
import 'components/dist/index.css'

// Basic Usage
class Example extends Component {
  render() {
    return <Input />
  }
}

// Callback Validation
class Example extends Component {

const handleValidation = (value) => {
  return value.includes('hello')
}

const validation = {
  callback: handleValidation,
  error: 'Must include hello'
}

  render() {
    return <Input validation={validation} />
  }
}

// Regex Validation
class Example extends Component {

  const validation = {
  regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  error: 'Must be in a hex color format',
  }

  render() {
    return <Input validation={validation} />
  }
}
```

### Input Props

| prop         | type     | description                                   |
| ---------    | -------- | --------------------------------------------- |
| className    | string   | css class names you want to add to the button |
| id           | integer  | input id (reflected on label)                 |
| label        | string   | input label text                              |
| labelSize    | string   | input label text size in px, vw, etc...       |
| onChange     | function | function to call when the input value changes. Arguments: (event, value) |
| size         | string   | mini, small, default, large, jumbo            |
| style        | object   | object with button styles                     |
| center       | boolean  | centers input horizontally                    |
| disabled     | boolean  | defines if the input is disabled              |
| required     | boolean  | defines if the input is required              |
| type         | string   | input type (e.g. "text")                      |
| borderHex    | string   | defines the hex color of the input border     |
| borderSize   | string   | defines the border size (in px)               |
| borderType   | string   | defines the border type (e.g. solid)          |
| validation   | object   | defines the validation parameters. Props: (error:**string**, callback:**func**, regex:**regex**)          |

## License

MIT © [farisaziz12](https://github.com/farisaziz12)
