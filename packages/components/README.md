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

## License

MIT © [farisaziz12](https://github.com/farisaziz12)
