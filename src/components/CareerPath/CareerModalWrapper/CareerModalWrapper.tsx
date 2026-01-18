'use client';

import { useRouter } from 'next/navigation';

import CareerModal from '@/components/CareerPath/CareerModal/CareerModal';
import { CareerPathData } from '@/types/career';

interface CareerModalWrapperProps {
  modalId: string | null;
  currentPage: number;
  career: CareerPathData;
}

export default function CareerModalWrapper({
  modalId,
  currentPage,
  career,
}: CareerModalWrapperProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push(`/career-path/${currentPage}`, { scroll: false });
  };

  return (
    <CareerModal
      isOpen={!!modalId}
      onClose={handleClose}
      voice={career.voice}
      title={career.title}
      age={career.age}
      sex={career.sex}
      course={career.course}
      reason={career.reason}
      description={career.description}
      youtubeId={career.youtubeId}
      detailTitle={career.detailTitle}
      achievement={career.achievement}
      detailContent={career.detailContent}
    />
  );
}