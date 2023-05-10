import { FC, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import TodoList from "./TodoList";
import AddTodoItem from "./AddTodoItem";
import { Todo } from "./Todo";
import Nav from "./Nav";
import EditTodoItems from "./EditTodoItem";

const { Header, Content } = Layout;

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = (text: string) => {
    const newTodos = [
      ...todos,
      { id: Date.now(), text: text, completed: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <Router>
      <Layout>
        <Header>
          <h1 style={{ color: "white" }}>My Todo App</h1>
        </Header>
        <Nav />
        <Content style={{ padding: "50px" }}>
          <Routes>
            <Route
              path="/"
              element={<TodoList todos={todos} setTodos={setTodos} />}
            ></Route>
            <Route
              path="/add"
              element={<AddTodoItem onAddItem={handleAddTodo} />}
            ></Route>
            <Route
              path="/edit/:id"
              element={<EditTodoItems todos={todos} setTodos={setTodos} />}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};
export default App;
