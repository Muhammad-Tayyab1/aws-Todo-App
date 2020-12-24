import React, { useState, useRef, useEffect } from "react"
import { addTodo } from "../graphql/mutations"
import { getTodos } from "../graphql/queries"
import { deleteTodo } from '../graphql/mutations'
import { API } from "aws-amplify"
import shortid from "shortid"
import { Delete} from '@material-ui/icons'
import "./style.css";
import { CircularProgress } from "@material-ui/core"
interface title {
  todoTittleRef: any
  ref: any
  title: string
  id: string
  done: string
}

interface incomingData {
  data: {
    getTodos: title[]
    deleteTodo: title[]
    updateTodo: title[]
  }
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [todoData, setTodoData] = useState<incomingData | null>(null)
  const todoTitleRef = useRef<any>("")

  const addTodoMutation = async () => {
    try {
      const todo = {
        id: shortid.generate(),
        title: todoTitleRef.current.value,
        done: false,
      }
      const data = await API.graphql({
        query: addTodo,
        variables: {
          todo: todo,
        },
      })
      todoTitleRef.current.value = ""
      fetchTodos()
      console.log(todo)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTodos = async () => {
    try {
      const data = await API.graphql({
        query: getTodos,
      })
      setTodoData(data as incomingData)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, []);

  const handleDelete = async (todoId) => {
    const data = await API.graphql({
      query: deleteTodo,
      variables: {
        todoId: todoId,
      },
    })

    fetchTodos()
  }
  if (loading) {
    return (
      <CircularProgress className="todoMain" variant="determinate" value={25} />
    );
  }

  return (
    <div className="container">
      <div>
        <h1>My Todo App</h1>
        <div className="add_todo">
          <label>
            <input type="text" required ref={todoTitleRef} placeholder="Add Todo..." />
          </label>
          <button onClick={() => addTodoMutation()}>Add</button>
        </div>
        <ul>
          {todoData.data &&
            todoData.data.getTodos.map((item) => (
              <li key={item.id}>
                <div className="listTodo">
                  <div>
                    {item.title}
                  </div>
                  <div className="icons">
                    <Delete onClick={() => handleDelete(item.id)} />
                  </div>
                </div>
              </li>))}
        </ul>
      </div>

    </div>
  )
}