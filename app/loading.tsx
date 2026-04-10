export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16 sm:px-8">
      <div className="h-7 w-56 animate-pulse rounded bg-slate-800" />
      <div className="h-14 w-full max-w-3xl animate-pulse rounded bg-slate-800" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-64 animate-pulse rounded-2xl bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
