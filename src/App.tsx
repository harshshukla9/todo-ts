import { useState } from 'react'
import { Todo } from './model'

import './App.css'
import Input from './Components/Input'
import Todolist from './Components/Todolist'

const App: React.FC =() => {

  const [todo,setTodo] =useState<string>("")
  const [todos,setTodos] = useState<Todo[]>([])


  const handleAdd = (e:React.FormEvent)=> {
    e.preventDefault()
    if(todo)
    {
      setTodos([...todos,{id:Date.now().toString(),todo:todo,isDone:false}])
    }
    setTodo("")

  }
  console.log(todos)
  

  return (

    <>
    <div className="w-[100vw] h-[100vh] bg-slate-600">
    <div className='flex flex-col items-center justify-center'>

    <div className='py-4 text-3xl font-bold flex flex-row justify-center items-center'>Todo Guardian </div>
    <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    <Todolist todos={todos} setTodos={setTodos}/>
    
      
    </div>
    </div>
    </>
  )
}

export default App
