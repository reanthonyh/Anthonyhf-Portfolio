interface Props {
  label: string;
  title: string;
}

export default function SectionHeader({ label, title }: Props) {
  return (
    <div className="mb-10">
      <p className="data-glow font-share-tech-mono text-sm mb-2 tracking-wider uppercase">
        [ {label} ]
      </p>
      <h3 className="text-2xl scan-text text-white uppercase tracking-wide">
        {title}
      </h3>
    </div>
  );
}
