import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AppState, AppStateContext } from '../../contexts/AppStateContext';
import { AnnotatedImage } from '../../models/AnnotatedImage';
import { CaseImageAnnotater } from '../CaseImageAnnotater/CaseImageAnnotater';
import styles from './CaseImageList.module.scss';

export const CaseImageList: React.FC = () => {
  const { selectedCase, updateSelectedCase } = useContext<AppState>(AppStateContext);
  const [selectedImage, setSelectedImage] = useState<AnnotatedImage | null>();

  useEffect(() => {
    if (selectedCase != null) {
      const caseSelectedImage = selectedCase.images.find(i => i.selected);
      setSelectedImage(caseSelectedImage ? caseSelectedImage : null);
    }
  }, [selectedCase]);

  if (selectedCase != null) {
    const getIndex = (image: AnnotatedImage): number => {
      return selectedCase.images.findIndex(i => i.original === image.original);
    }
  
    const appendImages = (newImages: AnnotatedImage[]) => {
      return [...selectedCase.images, ...newImages];
    }
  
    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files: File[] = Array.from(event.target.files as FileList);
      const annotatedImages = files.map(file => 
        new AnnotatedImage(URL.createObjectURL(file))
      )
      const images = appendImages(annotatedImages);
      updateSelectedCase({ images });
    }
  
    const handleThumbnailClick = (index: number) => {
      if (selectedCase) {
        const image = selectedCase.images[index];
        image.selected = true;
        const images = [...selectedCase.images.map((image, i) => {
          if (i !== index) image.selected = false;
          return image;
        })];
        const imageIndex = images.findIndex(i => i.original === image.original);
        images[imageIndex] = image;
        setSelectedImage(image);
        updateSelectedCase({ images });
      }
    }
  
    return (
      <>
      <div className={styles.CaseImageList} data-testid="CaseImageList">
        <label htmlFor="imageUpload" className={styles.CaseImageList__label}>
          <span>Upload Image</span>
        </label>
        <input className={styles.CaseImageList__input}
          multiple
          value={''}
          type="file"
          id="imageUpload"
          name="imageUpload"
          onChange={handleFileInputChange}
        />
        {selectedCase.images?.map((image, index) =>
          <div className={styles.CaseImageList__container}>
            <img className={styles.CaseImageList__thumbnail}
              src={image.original}
              key={"original-thumbnail"}
              alt=""
            />
            <img className={styles.CaseImageList__thumbnail_annotated}
              src={image.annotated || image.original}
              alt=""
              key={"annotated-thumbnail"}
              onClick={() => handleThumbnailClick(index)}
            />
          </div>
          )
        }
      </div>
      {selectedImage &&
        <CaseImageAnnotater image={selectedImage}
          index={getIndex(selectedImage)}
          updateSelectedCase={updateSelectedCase}
          setSelectedImage={setSelectedImage as React.Dispatch<React.SetStateAction<AnnotatedImage>>} />
      }
      </>
    )
  } else {
    return <></>
  }
};
