'use client';

import { useState } from 'react';

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
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isClosing) {return;}
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if(isClosing) {
      router.push(`/career-path/${currentPage}`, { scroll: false });
    }
  };

  if (!modalId) {
    if (isClosing) {
      setIsClosing(false);
    }
    return null;
  }

  return (
    <CareerModal
      isOpen={true}
      isClosing={isClosing}
      onClose={handleClose}
      onAnimationEnd={handleAnimationEnd}
      voice={career.voice}
      title={career.title}
      youtubeId={career.youtubeId}
      detailContent={career.detailContent}
    />
  );
}