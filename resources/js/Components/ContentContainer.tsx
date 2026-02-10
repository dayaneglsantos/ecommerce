export default function ContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
