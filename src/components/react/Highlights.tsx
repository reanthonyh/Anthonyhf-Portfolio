interface Props {
  items: string[];
}

export default function Highlights({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-3 space-y-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-sm text-umbrella-muted flex items-start gap-2"
        >
          <span className="text-umbrella-green mt-1.5">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
