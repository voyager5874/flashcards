import { FC, ReactElement } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ButtonFlatDesign } from 'components/Button';
import { DropdownSelect } from 'components/DropdownSelect';
import styles from 'components/Pagination/Pagination.module.scss';
import { ONE_STEP, STEP_TO_NEXT, ZERO_COUNT } from 'const';

type PaginationPropsType = {
  name: string;
  currentPage: number;
  totalItemsCount: number;
  currentItemsPerPageValue: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (itemsPerPage: number | string) => void;
  disabled: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
// const pageCountOptions = [5, 10, 20, 50, 100];
const pageCountOptions = ['5', '10', '20', '50', '100'];
// options={['five', 'ten', 'twelve', 'fifty', 'hundred']}

export const Pagination: FC<PaginationPropsType> = ({
  name,
  currentPage,
  totalItemsCount,
  currentItemsPerPageValue,
  onPageChange,
  onItemsPerPageChange,
  disabled,
}): ReactElement => {
  const pagesCount = Math.ceil(totalItemsCount / currentItemsPerPageValue);

  const changePageNext = () => {
    if (currentPage + STEP_TO_NEXT <= pagesCount) {
      onPageChange(currentPage + STEP_TO_NEXT);
    }
  };

  const changePagePrevious = () => {
    if (currentPage - ONE_STEP > ZERO_COUNT) {
      onPageChange(currentPage - ONE_STEP);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ButtonFlatDesign
        onClick={changePagePrevious}
        disabled={disabled}
        className={styles.button}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </ButtonFlatDesign>
      <div className={styles.page}>
        {currentPage} of {pagesCount}
      </div>
      <ButtonFlatDesign
        onClick={changePageNext}
        disabled={disabled}
        className={styles.button}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </ButtonFlatDesign>
      <div style={{ width: '250px' }}>
        <DropdownSelect
          options={pageCountOptions}
          compact
          name={name}
          onChangeOption={onItemsPerPageChange}
          value={currentItemsPerPageValue}
          placeholder={`${currentItemsPerPageValue} per page`}
        >
          {/* <FontAwesomeIcon icon={faBookOpen} /> */}
          {/* <FontAwesomeIcon icon={faBookOpen} /> */}
          {/* <FontAwesomeIcon icon={faBookOpen} /> */}
          {/* <FontAwesomeIcon icon={faBookOpen} /> */}
          {/* <FontAwesomeIcon icon={faBookOpen} /> */}
        </DropdownSelect>
      </div>
    </div>
  );
};
