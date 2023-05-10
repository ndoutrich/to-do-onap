import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button } from "antd";
import { Todo } from "./Todo";

interface Props {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

type RouteParams = {
  id: string;
};

const EditTodoItems: FC<Props> = ({ todos, setTodos }) => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [editTodoTitle, setEditTodoTitle] = useState("");

  useEffect(() => {
    const todoToEdit = todos.find((todo) => todo.id === Number(id));
    if (todoToEdit) {
      setEditTodoTitle(todoToEdit.text);
    } else {
      navigate("/");
    }
  }, [todos, id, navigate]);

  const handleEditTodoTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditTodoTitle(event.target.value);
  };

  const handleEditTodo = () => {
    if (editTodoTitle.trim() === "") {
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === Number(id)) {
        return {
          ...todo,
          text: editTodoTitle,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    navigate("/");
  };

  return (
    <div>
      <Input value={editTodoTitle} onChange={handleEditTodoTitleChange} />
      <Button type="primary" onClick={handleEditTodo}>
        Update
      </Button>
    </div>
  );
};

export default EditTodoItems;
