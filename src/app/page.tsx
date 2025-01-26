import Link from "next/link";

export default function Page() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="font-header text-h1">Are You Aware?</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-center font-text">
          Test your awareness level on social issues and learn more about them!
        </div>
        <Link href="/test">Begin</Link>
      </div>
    </main>
  );
}
