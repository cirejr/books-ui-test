import Link from "next/link";

export default function Header() {
  return (
    <div className='sticky top-0 bg-primary w-full z-40 h-20'>
      <header className='text-primary-foreground my-auto py-4 px-6 w-full h-full'>
        <div className='container mx-auto flex md:flex-row text-center items-center justify-center'>
          <Link href='/' className='cursor-pointer text-2xl font-bold'>
            Book Library
          </Link>
        </div>
      </header>
    </div>
  );
}
