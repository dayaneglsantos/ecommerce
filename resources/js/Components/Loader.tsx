export default function Loader() {
  return (
    <div className="flex items-center justify-center py-6">
      {' '}
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        {' '}
        <div className="h-full bg-primary animate-[progress_1.5s_ease-in-out_infinite]"></div>{' '}
      </div>{' '}
    </div>
  );
}
