export default function Loading() {
  return (
    <div className='fixed inset-0 bg-gradient-to-l from-primary to-primary-foreground z-[10000] flex flex-1 items-center justify-center'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
