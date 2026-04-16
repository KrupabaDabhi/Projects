function Skeleton({ width = '100%', height = '20px', borderRadius = '6px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton height="180px" borderRadius="8px 8px 0 0" />
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Skeleton width="60%" height="14px" />
        <Skeleton height="16px" />
        <Skeleton width="80%" height="14px" />
      </div>
    </div>
  );
}

export default Skeleton;
