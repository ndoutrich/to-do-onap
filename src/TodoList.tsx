import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Checkbox, Button, Modal } from "antd";
import { Todo } from "./Todo";

interface Props {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const TodoList: FC<Props> = ({ todos, setTodos }) => {
  const [deletingItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmationVisible] = useState(false);
  const navigate = useNavigate();
  const handleTodoCheckboxChange = (id: number) => {
    const todoList = JSON.parse(localStorage.getItem("todos") || "[]");
    const todoIndex = todoList.findIndex((todo: Todo) => todo.id === id);

    // if (todoList[todoIndex].completed === true) {
    //   todoList[todoIndex].completed = false;
    // } else {
    //   todoList[todoIndex].completed = true;
    // }

    todoList[todoIndex].completed = !todoList[todoIndex].completed;
    localStorage.setItem("todos", JSON.stringify(todoList));
    setTodos(todoList);
  };

  const handleTodoDelete = (id: number) => {
    setDeleteItemId(id);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deletingItemId) {
      const newItems = todos.filter((item) => item.id !== deletingItemId);
      localStorage.setItem("todos", JSON.stringify(newItems));
      setTodos(newItems);
      setDeleteItemId(null);
      setDeleteConfirmationVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setDeleteConfirmationVisible(false);
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button type="text" onClick={() => navigate(`/edit/${todo.id}`)}>
                Edit
              </Button>,
              <Button type="text" onClick={() => handleTodoDelete(todo.id)}>
                Delete
              </Button>,
            ]}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => handleTodoCheckboxChange(todo.id)}
            >
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </Checkbox>
          </List.Item>
        )}
      />
      <Modal
        title="Are you sure you want to delete this Todo?"
        open={deleteConfirmation}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>This action cannot be undone</p>
      </Modal>
    </>
  );
};

export default TodoList;
