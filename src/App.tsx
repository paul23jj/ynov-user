import './App.css'
import { useState } from 'react'
import HelloWorld from './components/HelloWorld'

function App() {
  const [count, setCount] = useState<number>(0)
  let isValid: boolean = true;
  return (
    <>
        <section id="center">
        <div>
          { isValid && <HelloWorld name="Ynov user"/>}
          {
            count > 3 ? // = if count > 3
                <div>Important things</div>
                : // = else
                <div>Sile things</div>
          }
          {
            ["Tom", "Amex", "Kékédab"]
                .map((el) => <HelloWorld name={el}/>)
          }
          {
            <button onClick={() => setCount(count+1) }>Click here !</button>
          }
        </div>
        </section>
    </>
  )
}

export default App
