import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blogdetail/:id" element={<BlogDetail />} />
        {/* <Route path="/blogdetail/:url" element={<BlogDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
