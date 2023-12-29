/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";

const Projects = () => {
  const [filtered, setFiltered] = useState<any>(null);

  const projects = useSelector((state: any) => state.projects?.projects);
  const searchTerm = useSelector((state: any) =>
    state?.searchTerm?.searchTerm ? state?.searchTerm?.searchTerm : "",
  );

  useEffect(() => {
    if (searchTerm?.length > 0) {
      setFiltered(
        projects?.filter((project: any) => {
          const lowerCaseItem = project?.title.toLowerCase();
          return searchTerm
            .split("")
            .every((letter: string) => lowerCaseItem.includes(letter));
        }),
      );
    } else {
      setFiltered(null);
    }
  }, [projects, searchTerm]);

  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      {filtered ? (
        <>
          {filtered &&
            filtered.map((project: any, index: any) => (
              <ProjectCard project={project} key={index} index={index} />
            ))}
        </>
      ) : (
        <>
          {projects &&
            projects.map((project: any, index: any) => (
              <ProjectCard project={project} key={index} index={index} />
            ))}
        </>
      )}
    </div>
  );
};

export default Projects;
