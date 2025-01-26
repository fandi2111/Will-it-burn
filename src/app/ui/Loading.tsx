import { BarLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <BarLoader />
    </div>
  );
}
