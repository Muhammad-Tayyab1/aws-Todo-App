import React, { useState } from "react"
import { useQuery, gql, useMutation } from "@apollo/client"
import shortid from "shortid"
import { Delete } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core"
import "./style.css";
const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      done
    }
  }
`
const CREATE_TODO = gql`
  mutation createTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      done
    }
  }
`
const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: String!) {
    deleteTodo(todoId: $todoId)
  }
`

const Index = () => {
  const [title, setTitle] = useState("")
  const { data, loading } = useQuery(GET_TODOS)
  const [createNote] = useMutation(CREATE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)

  const handleSubmit = async () => {
    const todo = {
      id: shortid.generate(),
      title,
      done: false,
    }
    console.log("Creating Todo:", todo)
    setTitle("")
    await createNote({
      variables: {
        todo,
      },
      refetchQueries: [{ query: GET_TODOS }]
    })
  }
  const handleDelete = async (todoId) => {
    const data = await deleteTodo({
      variables: { todoId: todoId },
      refetchQueries: [{ query: GET_TODOS }]
    })
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
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
          <button onClick={() => handleSubmit()}>Add</button> 
          </div>
          <ul>
            {
              data &&
              data.getTodos.map(item => (

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

export default Index