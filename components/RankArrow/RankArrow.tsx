import { FC } from 'react';
import { useTheme } from '@emotion/react';

interface RankArrowProps {
  variant?: string;
}

const RankArrow: FC<RankArrowProps> = ({ variant }) => {
  const theme = useTheme();

  const getArrow = () => {
    switch (variant) {
      case 'red':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={10}
            width={10}
            viewBox="0 0 24 24"
            role="img"
            focusable="false"
            fill={theme.palette.error.main}
          >
            <title>Moved down</title>
            <polygon
              fillRule="evenodd"
              points="20.521 -2.479 20.521 14.521 3.521 14.521"
              transform="rotate(45 12.02 6.02)"
              aria-hidden="true"
            />
          </svg>
        );
      case 'green':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={10}
            width={10}
            viewBox="0 0 24 24"
            role="img"
            focusable="false"
            fill={theme.palette.success.main}
          >
            <title>Moved up</title>
            <polygon
              fillRule="evenodd"
              points="20.521 8.521 20.521 25.521 3.521 25.521"
              transform="rotate(-135 12.02 17.02)"
              aria-hidden="true"
            />
          </svg>
        );
      case 'grey':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={8}
            width={8}
            viewBox="0 0 24 24"
            role="img"
            focusable="false"
            fill="grey"
          >
            <title>Same position</title>
            <circle cx="12" cy="12" r="12" fillRule="evenodd" aria-hidden="true" />
          </svg>
        );
      default:
        return null;
    }
  };

  return getArrow();
};
export default RankArrow;
