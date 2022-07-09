import { FC, ReactElement } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Pagination.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { DropdownSelect } from 'features/ui/flat-design';

type PaginationPropsType = {
  name: string;
  currentPage: number;
  totalItemsCount: number;
  currentItemsPerPageValue: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

export const Pagination: FC<PaginationPropsType> = ({
  name,
  currentPage,
  totalItemsCount,
  currentItemsPerPageValue,
  onPageChange,
  onItemsPerPageChange,
}): ReactElement => {
  const pagesCount = Math.ceil(totalItemsCount / currentItemsPerPageValue);
  const changePageNext = () => {
    if (currentPage + 1 <= pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  const changePagePrevious = () => {
    if (currentPage - 1 > 0) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ButtonFlatDesign onClick={changePagePrevious}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </ButtonFlatDesign>
      <div className={styles.page}>{currentPage}</div>
      <ButtonFlatDesign onClick={changePageNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </ButtonFlatDesign>
      <div style={{ width: '150px' }}>
        <DropdownSelect
          options={[5, 10, 20, 50, 100]}
          name={name}
          onChangeOption={onItemsPerPageChange}
          value={currentItemsPerPageValue}
        />
      </div>
    </div>
  );
};
