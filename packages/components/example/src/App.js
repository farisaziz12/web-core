import React from 'react'

import { Button } from 'components'
import 'components/dist/index.css'

const App = () => {
  return (
    <Button
      className='hello'
      hex='#ff0000'
      text='test'
      onClick={(e) => console.log(e)}
      disabled
      size='large'
    >
      Hello
    </Button>
  )
}

export default App
