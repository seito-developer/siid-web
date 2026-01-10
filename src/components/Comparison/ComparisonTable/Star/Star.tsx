export default function Star({ fill = '#342525' }: { fill?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0L8.44533 5.55467L14 7L8.44533 8.44533L7 14L5.55467 8.44533L0 7L5.55467 5.55467L7 0Z" fill={fill} />
    </svg>
  );
}
