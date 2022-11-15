import { useState, createContext, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HomePage } from './ui/home';
import { MenuBar } from './ui/menu'
import { MainLayout } from './ui/layout'
import { Project } from './ui/project';
import ReactTooltip from "react-tooltip";
import "antd/dist/antd.min.css";
import '../src/ui/style/index.css';

Project.active = new Project()

export const ProjectContext = createContext<typeof Project>(null!)
const App = () => {
  const [homepage, setHomepage] = useState(true);
  const menuChild = useRef(null)
  const togglePage = (bool: boolean) => {
    setHomepage(bool)
  }
  return (
    <ProjectContext.Provider value={Project}>
      {homepage && <HomePage onTogglePage={togglePage} />}
      <ReactTooltip />
      <MenuBar onTogglePage={togglePage} ref={menuChild} />
      <MainLayout />
    </ProjectContext.Provider>)
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

