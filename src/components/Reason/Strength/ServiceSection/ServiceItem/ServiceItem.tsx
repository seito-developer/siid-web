import CommunityIcon from './Icons/CommunityIcon';
import CurriculumIcon from './Icons/CurriculumIcon';
import PortfolioIcon from './Icons/PortfolioIcon';
import TemplateIcon from './Icons/TemplateIcon';
import ZoomIcon from './Icons/ZoomIcon';
import styles from './ServiceItem.module.css';

interface ServiceItemProps {
  type: 'curriculum' | 'template' | 'portfolio' | 'community' | 'zoom';
  title: React.ReactNode;
}

export default function ServiceItem({ type, title }: ServiceItemProps) {
  const icons = {
    curriculum: <CurriculumIcon />,
    template: <TemplateIcon />,
    portfolio: <PortfolioIcon />,
    community: <CommunityIcon />,
    zoom: <ZoomIcon />,
  };

  return (
    <div className={styles.ServiceItem}>
      <div className={styles.ServiceItem__Icon}>{icons[type]}</div>
      <p className={styles.ServiceItem__Title}>{title}</p>
    </div>
  );
}
