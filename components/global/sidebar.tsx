import { getShelves } from "@/lib/actions";
import Link from "next/link";

export default async function Sidebar() {
  const shelves = await getShelves();
  return (
    <>
      <aside className='hidden lg:flex fixed  lg:h-screen w-0 flex-col bg-[#1e293b] text-[#94a3b8] sm:w-64'>
        <nav className='flex-1 flex-col gap-2 overflow-y-auto px-2 py-4 sm:px-6'>
          {shelves.map((shelf: Shelf) => (
            <Link
              key={shelf.id}
              href={`/books/${shelf.id}`}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#334155] hover:text-white '
              prefetch={false}
            >
              <span className=''>{shelf.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <aside className='flex w-full bottom-0 z-20 mt-40 fixed flex-col bg-[#1e293b] text-[#94a3b8] lg:hidden justify-center'>
        <nav className='h-full flex flex-row gap-2 overflow-y-hidden px-2 py-4 sm:px-6 justify-center'>
          {shelves.map((shelf: Shelf) => (
            <Link
              key={shelf.id}
              href={`/books/${shelf.id}`}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#334155] hover:text-white '
              prefetch={false}
            >
              <span className=''>{shelf.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
