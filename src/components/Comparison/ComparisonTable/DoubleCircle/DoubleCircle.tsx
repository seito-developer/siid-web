export default function DoubleCircle({ fill = '#475499' }: { fill?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8.75002" stroke={fill} strokeWidth="2.49997" />
      <circle cx="9.99935" cy="9.9974" r="4.58335" stroke={fill} strokeWidth="2.49997" />
    </svg>
  );
}
