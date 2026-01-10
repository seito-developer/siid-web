export default function Triangle({ fill = '#000' }: { fill?: string }) {
  return (
    <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.366 2.25C10.9433 1.25013 12.3863 1.25011 12.9636 2.25L21.6238 17.25C22.2011 18.25 21.4797 19.5 20.325 19.5H3.00464C1.84994 19.5 1.12846 18.25 1.70581 17.25L10.366 2.25Z" stroke={fill} strokeWidth="3" />
    </svg>
  );
}
