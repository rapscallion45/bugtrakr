import { FC } from 'react';
import useViewFilterController from './ViewFilterController';
import SelectBox from '../SelectBox/SelectBox';
import SliderFilter from '../SliderFilter/SliderFilter';

interface ViewFilterProps {
  filterConfig?: any;
  onViewFilterChange?: () => void;
}

const ViewFilter: FC<ViewFilterProps> = function ViewFilter({ filterConfig, onViewFilterChange }) {
  const { selectionDisabled, initialValue, onViewChange } = useViewFilterController(
    filterConfig.name,
    filterConfig.values,
    onViewFilterChange,
    filterConfig.initialSelection
  );

  const getSearchBox = () => (
    <SelectBox
      disabled={selectionDisabled}
      selectBoxTitle={filterConfig.label}
      selectBoxName={filterConfig.name}
      selectionValues={filterConfig.values}
      onSelectUpdate={onViewChange}
      initialValue={initialValue}
      sortKey={filterConfig.sortKey}
    />
  );

  const getSlider = () => (
    <SliderFilter
      disabled={selectionDisabled}
      sliderName={filterConfig.name}
      sliderLabel={filterConfig.label}
      selectionValues={filterConfig.values}
      initialValue={initialValue}
      minValue={filterConfig.minValue}
      maxValue={filterConfig.maxValue}
      marks={filterConfig.marks}
      onSliderUpdate={onViewChange}
    />
  );

  return (
    <>
      {(!filterConfig.type || filterConfig.type === '') && getSearchBox()}
      {filterConfig.type === 'slider' && getSlider()}
    </>
  );
};
export default ViewFilter;
