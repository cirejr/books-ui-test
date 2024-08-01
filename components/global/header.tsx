import Link from "next/link";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <div className='sticky top-0 bg-primary w-full z-40 '>
      <header className='text-primary-foreground py-4 px-6 w-full h-20'>
        <div className='container mx-auto flex md:flex-row items-center justify-between'>
          <Link href='/' className='cursor-pointer text-2xl font-bold'>
            Book Library
          </Link>
          <div className='relative w-auto md:w-full max-w-md'>
            <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
            <Input
              type='text'
              placeholder='Search books...'
              /* value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} */
              className='pl-10 pr-4 py-2 rounded-md w-full bg-primary-foreground text-primary focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>
        </div>
      </header>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
