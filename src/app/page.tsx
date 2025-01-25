import Link from "next/link";

export default function Page() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="font-header text-h1">The landing page</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center font-text">
          This will the be landing page when the user come.
        </div>
        <Link href="/play">Play</Link>
      </div>
    </main>
  );
}
