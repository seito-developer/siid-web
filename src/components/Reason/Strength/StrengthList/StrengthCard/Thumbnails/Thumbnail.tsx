import { Chart, Gear, Chat, App, Goal, Community } from './Thumbnails';

interface ThumbnailProps {
  type: 'chart' | 'gear' | 'chat' | 'app' | 'goal' | 'community';
  className?: string;
}

export default function Thumbnail({ type, className }: ThumbnailProps) {
  const renderIcon = () => {
    switch (type) {
    case 'chart':
      return <Chart />;
    case 'gear':
      return <Gear />;
    case 'chat':
      return <Chat />;
    case 'app':
      return <App />;
    case 'goal':
      return <Goal />;
    case 'community':
      return <Community />;
    default:
      return null;
    }
  };

  return <div className={className}>{renderIcon()}</div>;
}
