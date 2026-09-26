import { useCallback, useMemo, useReducer } from "react";
import SectionHeader from "@/components/react/SectionHeader";
import ProjectCard from "./ProjectCard";
import ProjectGallery from "./ProjectGallery";
import type { Project } from "./types";

interface State {
  selectedId: string;
  openId: string | null;
  imageIndex: number;
}

type Action =
  | { type: "toggle"; id: string }
  | { type: "step"; delta: number; length: number }
  | { type: "jump"; index: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggle":
      return {
        selectedId: action.id,
        openId: state.openId === action.id ? null : action.id,
        imageIndex: 0,
      };
    case "step": {
      if (action.length === 0) return state;
      return {
        ...state,
        imageIndex:
          (state.imageIndex + action.delta + action.length) % action.length,
      };
    }
    case "jump":
      return { ...state, imageIndex: action.index };
  }
}

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    selectedId: projects[0]?.id ?? "",
    openId: null,
    imageIndex: 0,
  });

  const selected = useMemo(
    () => projects.find((p) => p.id === state.selectedId) ?? projects[0],
    [projects, state.selectedId],
  );

  const handleStep = useCallback(
    (delta: number) =>
      dispatch({ type: "step", delta, length: selected?.images.length ?? 0 }),
    [selected],
  );

  if (!selected) return null;

  return (
    <section
      id="projects"
      className="px-8 py-16 lg:px-16 border-t border-umbrella-line"
    >
      <SectionHeader label="Built" title="Projects" />
      <div className="lg:flex lg:flex-row lg:gap-8 lg:min-h-[600px]">
        <div className="lg:w-1/2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 mb-6 lg:mb-0">
            {projects.map((project, i) => {
              const baseColSpan = i === 0 ? 2 : 1;
              const colSpan = state.openId === project.id ? Math.min(baseColSpan * 2, 4) : baseColSpan;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isSelected={project.id === selected.id}
                  isOpen={project.id === state.openId}
                  panelId={`project-panel-${i}`}
                  onToggle={() => dispatch({ type: "toggle", id: project.id })}
                  colSpan={colSpan}
                />
              );
            })}
          </div>
        </div>
        <div className="lg:w-1/2">
          <ProjectGallery
            project={selected}
            imageIndex={state.imageIndex}
            onStep={handleStep}
            onJump={(index) => dispatch({ type: "jump", index })}
          />
        </div>
      </div>
    </section>
  );
}
