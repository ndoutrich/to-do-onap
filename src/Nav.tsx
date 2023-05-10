import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-black">
        <div className="container-fluid">
          <Button className="navbar-toggler" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button className="navbar-toggler" onClick={() => navigate("/add")}>
            Add Todo
          </Button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
