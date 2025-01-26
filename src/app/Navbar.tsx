import Link from "next/link";

export default function Navbar() {
  return (
    <div className="absolute left-0 top-0 z-20 flex w-screen justify-between overflow-hidden p-8 text-lg">
      <Link href="/" className="">
        Will It Burn
      </Link>
    </div>
  );
}
