export default function ContentContainer({
  children,
  maxWidth = 'max-w-6xl',
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className={`mx-auto ${maxWidth} space-y-6 px-3 sm:px-6 lg:px-8`}>
      {' '}
      {children}{' '}
    </div>
  );
}
