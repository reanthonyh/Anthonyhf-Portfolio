import type { Project } from "./types";

interface Props {
  project: Project;
  imageIndex: number;
  onStep: (delta: number) => void;
  onJump: (index: number) => void;
}

const arrowClass =
  "p-2 bg-black/60 border border-umbrella-line hover:border-umbrella-green text-umbrella-muted hover:text-umbrella-green transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default disabled:hover:border-umbrella-line disabled:hover:text-umbrella-muted";

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
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
      {dir === "prev" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}

export default function ProjectGallery({
  project,
  imageIndex,
  onStep,
  onJump,
}: Props) {
  const images = project.images;
  const total = images.length;
  const current = total > 0 ? Math.min(imageIndex, total - 1) : 0;

  return (
    <div className="bg-umbrella-surface border border-umbrella-line p-5">
      <div className="flex items-center justify-between gap-4 mb-4 font-share-tech-mono text-xs uppercase tracking-wider">
        <span className="text-umbrella-muted truncate">
          Viewer // <span className="text-white">{project.name}</span>
        </span>
        {total > 0 && (
          <span className="data-glow shrink-0">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        )}
      </div>

      {total === 0 ? (
        <div className="flex items-center justify-center h-40 border border-dashed border-umbrella-line font-share-tech-mono text-xs uppercase tracking-wider text-umbrella-muted">
          No media available for this project
        </div>
      ) : (
        <>
          {/* Portrait-first stage: the image keeps its aspect ratio and is
              capped by height, so tall screenshots are never cropped. */}
          <div className="flex items-center justify-center bg-black/40 border border-umbrella-line p-2 min-h-40 max-h-[70vh] overflow-hidden">
            <img
              key={images[current]}
              src={images[current]}
              alt={`${project.name} screenshot ${current + 1}`}
              loading={current === 0 ? "eager" : "lazy"}
              className="max-h-[calc(70vh-1rem)] max-w-full h-auto w-auto object-contain"
            />
          </div>

          {total > 1 && (
            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous image"
                className={arrowClass}
              >
                <Arrow dir="prev" />
              </button>

              <div className="flex items-center gap-1.5">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => onJump(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === current}
                    className={`w-6 h-1 cursor-pointer transition-colors ${
                      i === current
                        ? "bg-umbrella-green"
                        : "bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next image"
                className={arrowClass}
              >
                <Arrow dir="next" />
              </button>
            </div>
          )}

          {total > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => onJump(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={i === current}
                  className={`shrink-0 border p-1 bg-umbrella-surface transition-colors cursor-pointer ${
                    i === current
                      ? "border-umbrella-green"
                      : "border-umbrella-line/50 hover:border-umbrella-green/60"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-10 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
