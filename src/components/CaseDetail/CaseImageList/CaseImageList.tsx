import classNames from 'classnames';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AppState, AppStateContext } from '../../../contexts/AppStateContext';
import { AnnotatedImage } from '../../../models/AnnotatedImage';
import { CaseStatus } from '../../../models/CaseStatus';
import { blobToBase64 } from '../../../utils/utils';
import { CaseImageAnnotater } from '../CaseImageAnnotater/CaseImageAnnotater';
import styles from './CaseImageList.module.scss';

export const CaseImageList: React.FC = () => {
  const { selectedCase, updateSelectedCase } = useContext<AppState>(AppStateContext);
  const [selectedImage, setSelectedImage] = useState<AnnotatedImage | undefined>();

  useEffect(() => {
    if (selectedCase != null) {
      const caseSelectedImage = selectedCase.images.find(i => i.selected);
      setSelectedImage(caseSelectedImage ? caseSelectedImage : undefined);
    }
  }, [selectedCase]);

  const getIndex = (image?: AnnotatedImage): number => {
    return selectedCase && selectedCase.images && image
      ? selectedCase.images.findIndex(i => i.original === image.original)
      : -1;
  }

  if (selectedCase != null) {  
    const appendImages = (newImages: AnnotatedImage[]) => {
      return [...selectedCase.images, ...newImages];
    }
  
    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const files: File[] = Array.from(event.target.files as FileList);
      const blobUrls: string[] = files.map(file => URL.createObjectURL(file));
      const annotatedImages = await Promise.all(
        blobUrls.map(async url => {
          const imageData: string = await fetch(url)
            .then(async (res) => {
              const blob: Blob = await res.blob();
              const result: string = await blobToBase64(blob);
              return result;
            });
          return new AnnotatedImage(imageData);
        })
      );
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

    const classes = selectedCase.status === CaseStatus.APPROVED
      ? classNames(styles.CaseImageList__label___disabled, styles.CaseImageList__label)
      : styles.CaseImageList__label;
  
    return (
      <>
      <div className={styles.CaseImageList}>
        <label htmlFor="imageUpload" className={classes}>
          Upload Image
        </label>
        <input disabled={selectedCase.status === CaseStatus.APPROVED} className={styles.CaseImageList__input}
          multiple
          value={''}
          type="file"
          id="imageUpload"
          name="imageUpload"
          onChange={handleFileInputChange}
        />
        {selectedCase.images?.map((image, index) =>
          <div className={styles.CaseImageList__container} key={image.uuid}>
            <img className={styles.CaseImageList__thumbnail}
              src={image.original}
              alt=""
            />
            <img className={styles.CaseImageList__thumbnail_annotated}
              src={image.annotated || image.original}
              alt=""
              // key={`${image.original}-annotated-thumbnail`}
              onClick={() => handleThumbnailClick(index)}
            />
          </div>
          )
        }
      </div>
      {
        <CaseImageAnnotater image={selectedImage}
          status={selectedCase.status}
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
