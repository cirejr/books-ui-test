import Link from "next/link";

export default function Header() {
  return (
    <div className='sticky top-0 bg-primary w-full z-40 '>
      <header className='text-primary-foreground py-4 px-6 w-full h-20'>
        <div className='container mx-auto flex md:flex-row items-center justify-between'>
          <Link href='/' className='cursor-pointer text-2xl font-bold'>
            Book Library
          </Link>
        </div>
      </header>
    </div>
  );
}
