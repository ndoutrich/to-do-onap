import { useNavigate } from "react-router-dom";
import { Input, Button, Form } from "antd";

type Props = {
  onAddItem: (text: string) => void;
};

const AddTodoItem: React.FC<Props> = ({ onAddItem }) => {
  const navigate = useNavigate();
  const handleFormSubmit = (values: { text: string }) => {
    const text = values.text.trim();
    if (text) {
      onAddItem(text);
      navigate("/");
    }
  };
  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Add Todo Item</h1>
      <Form onFinish={handleFormSubmit}>
        <Form.Item
          name="text"
          rules={[{ required: true, message: "Please enter todo item" }]}
        >
          <Input placeholder="Enter todo item" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Form.Item>
        <Form.Item>
          <Button style={{ marginLeft: "10px" }} onClick={handleCancelClick}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTodoItem;
