import { useState } from "react";
import Menu from "../menu/Menu";
import Topbar from "../topbar/Topbar";

const Posts = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="sections">
        post
      </div>
    </div>
  );
};

export default Posts;
