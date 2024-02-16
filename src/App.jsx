import { useState } from "react";
import { SideBar, NewProject, NoProjects } from "./listing";
import { v4 as uuidv4 } from "uuid";
import SelectedItem from "./components/SelectedItem";

function App() {
  const [projectState, setProjectState] = useState({
    projectId: undefined,
    projects: [],
  });

  const [projectSelected, setProjectSelected] = useState(false);
  const [currentProject, setCurrentProject] = useState(false);

  const handleStartProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projectId: -1,
      };
    });
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: uuidv4(),
    };

    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  const cancelFirstProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projectId: undefined,
      };
    });
  };

  const handleProjectSelect = (id) => {
    setProjectSelected(true);

    const curr = projectState.projects.find((item) => item.id === id);
    setCurrentProject(curr);
  };

  const handleDeleteProject = (id) => {
    const curr = projectState.projects.filter((item) => item.id !== id);
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: curr,
      };
    });
    console.log(projectState.projects);
    if (projectState.projects.length === 0) {
      handleStartProject();
    }
  };

  return (
    <main className="h-screen flex gap-8">
      <SideBar
        onStart={handleStartProject}
        projects={projectState.projects}
        onSelection={handleProjectSelect}
      />
      {projectState.projectId ? (
        !projectSelected ? (
          <NewProject onAdd={handleAddProject} onCancel={cancelFirstProject} />
        ) : (
          <SelectedItem
            project={currentProject}
            handleDelete={handleDeleteProject}
          />
        )
      ) : (
        <NoProjects onStart={handleStartProject} />
      )}
    </main>
  );
}

export default App;
