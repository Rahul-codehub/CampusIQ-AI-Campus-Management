interface Props {
  title: string;
}

export default function FeatureChip({
  title,
}: Props) {
  return (
    <div
      className="
        rounded-full
        border
        border-white/20
        bg-white/10
        backdrop-blur-md
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition-all
        duration-300
        hover:bg-white/20
      "
    >
      {title}
    </div>
  );
}