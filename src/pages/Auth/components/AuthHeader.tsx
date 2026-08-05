import { GraduationCap } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function AuthHeader({
  title,
  description,
}: Props) {
  return (
    <div className="text-center mb-8">

      <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg">

        <GraduationCap className="w-8 h-8 text-white" />

      </div>

      <h1 className="mt-5 text-3xl font-bold">

        CampusIQ

      </h1>

      <p className="text-sm text-muted-foreground">

        AI Powered Campus Management

      </p>

      <div className="mt-8">

        <h2 className="text-2xl font-semibold">

          {title} 👋

        </h2>

        <p className="text-muted-foreground mt-2">

          {description}

        </p>

      </div>

    </div>
  );
}