export function SkeletonCard({ h = 120 }: { h?: number }) {
  return (
    <div
      className="glass rounded-xl animate-pulse bg-surface-800/30"
      style={{ height: h }}
    />
  )
}
