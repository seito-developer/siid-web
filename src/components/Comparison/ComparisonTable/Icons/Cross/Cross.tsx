export default function Cross({ fill = '#000' }: { fill?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1.5L10.8333 10.8333M10.8333 10.8333L20.1667 20.1667M10.8333 10.8333L20.1667 1.5M10.8333 10.8333L1.5 20.1667" stroke={fill} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
