import { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { HomePage } from './ui/home';
import ReactTooltip from "react-tooltip";
import "antd/dist/antd.min.css";
import '../src/ui/style/index.css';


const ProjectContext = createContext(null)
const App = () => {
  const [homepage, setHomepage] = useState(true);
  const togglePage = (bool: boolean) => {
    setHomepage(bool)
  }
  return (
  <ProjectContext.Provider value={null}>
    {homepage && <HomePage onTogglePage={togglePage} />}
    <ReactTooltip/>

  </ProjectContext.Provider>)
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

