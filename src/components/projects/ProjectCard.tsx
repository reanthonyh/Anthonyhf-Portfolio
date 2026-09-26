import Highlights from "@/components/react/Highlights";
import type { Project } from "./types";

interface Props {
  project: Project;
  isSelected: boolean;
  isOpen: boolean;
  panelId: string;
  onToggle: () => void;
  colSpan?: number;
}

export default function ProjectCard({
  project,
  isSelected,
  isOpen,
  panelId,
  onToggle,
  colSpan = 1,
}: Props) {
  const imageCount = project.images.length;

  return (
    <article
      className={`group bg-umbrella-surface border p-5 transition-colors align-self-start col-span-${colSpan} ${
        isSelected
          ? "border-umbrella-green/60 bg-white/5"
          : "border-umbrella-line hover:border-umbrella-green/60 hover:bg-white/5"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex-1 min-w-0 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="font-share-tech-mono text-xs text-umbrella-green">
              ▸
            </span>
            <h4
              className={`text-lg scan-text uppercase tracking-wide transition-colors ${
                isSelected
                  ? "text-umbrella-green"
                  : "text-white group-hover:text-umbrella-green"
              }`}
            >
              {project.name}
            </h4>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-share-tech-mono text-xs text-umbrella-muted">
            <span className="data-glow">{project.dateRange}</span>
            {imageCount > 0 && (
              <span className="uppercase tracking-wider">
                {imageCount} image{imageCount === 1 ? "" : "s"}
              </span>
            )}
            {project.highlights.length > 0 && (
              <span className="uppercase tracking-wider">
                {project.highlights.length} notes
              </span>
            )}
          </div>
        </button>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} repository`}
            className="shrink-0 p-1 -mt-1 text-umbrella-muted hover:text-umbrella-green transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div
            id={panelId}
            className={`pt-4 mt-4 border-t border-umbrella-line/70 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm scan-text">{project.description}</p>
            <Highlights items={project.highlights} />
            <p className="mt-4 font-share-tech-mono text-xs uppercase tracking-wider text-umbrella-muted">
              {isSelected
                ? "▸ media loaded in viewer below"
                : "▸ open to load media in viewer below"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
