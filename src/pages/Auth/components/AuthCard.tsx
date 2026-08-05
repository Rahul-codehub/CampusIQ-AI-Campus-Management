import { Card, CardContent } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
}

export default function AuthCard({
  children,
}: Props) {
  return (
    <Card
      className="
        w-full
        max-w-xl
        mx-auto
        rounded-[32px]
        border
        border-white/20
        bg-white/10
        backdrop-blur-3xl
        shadow-[0_30px_80px_rgba(0,0,0,0.45)]
        overflow-hidden
      "
    >
      <CardContent className="p-10">
        {children}
      </CardContent>
    </Card>
  );
}