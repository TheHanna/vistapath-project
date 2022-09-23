import { MarkerArea, MarkerAreaRenderEvent } from 'markerjs2';
import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import { AnnotatedImage } from '../../models/AnnotatedImage';
import { CaseAnalysis, CaseUpdate } from '../../models/CaseAnalysis';
import styles from './CaseImageAnnotater.module.scss';

interface CaseImageAnnotaterProps {
  image: AnnotatedImage;
  index: number;
  setSelectedImage: Dispatch<SetStateAction<AnnotatedImage>>
  updateSelectedCase: (caseUpdate?: CaseUpdate) => void;
}

export const CaseImageAnnotater: FC<CaseImageAnnotaterProps> = (props) => {
  const { selectedCase } = useContext(AppStateContext);
  const { image, index, setSelectedImage, updateSelectedCase } = props;
  const imgRef = React.createRef<HTMLImageElement>();
  const annotationRef = React.createRef<HTMLImageElement>();

  const handleMarkerAreaRender = (event: MarkerAreaRenderEvent) => {
    const { dataUrl: annotated, state } = event;
    const updatedImage = { ...image, annotated, state };
    const images = [...(selectedCase as CaseAnalysis).images];
    images[index] = updatedImage;
    setSelectedImage(updatedImage);
    (annotationRef.current as HTMLImageElement).src = annotated;
    updateSelectedCase({ images });
  }

  const showMarkerArea = () => {
    if (imgRef.current !== null) {
      const markerArea = new MarkerArea(imgRef.current);
      markerArea.renderMarkersOnly = true;
      markerArea.targetRoot = imgRef.current.parentElement as HTMLElement;
      markerArea.addEventListener('render', handleMarkerAreaRender);
      markerArea.show();
      if (image.state) markerArea.restoreState(image.state);
    }
  }

  return (
    <section className={styles.CaseImageAnnotater}>
      <div className={styles.CaseImageAnnotater__container}>
        <img ref={imgRef}
          src={image.original}
          alt="Original"
          key={"original"}
          className={styles.CaseImageAnnotater__original}
          onClick={showMarkerArea}
        />
        <img ref={annotationRef}
          src={image.annotated || image.original}
          alt="Annotated"
          key={"annotated"}
          className={styles.CaseImageAnnotater__annotated}
          onClick={showMarkerArea}
        />
      </div>
    </section>
  )
};
