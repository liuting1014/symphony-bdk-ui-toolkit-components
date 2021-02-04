import * as React from 'react';
import Select from 'react-select';
import { Option } from 'react-select/src/filters';
import {
  ClearIndicator,
  Control,
  DefaultOptionRenderer,
  DefaultTagRenderer,
  DropdownIndicator,
  MultiValueContainerOverride,
  MultiValueRemove,
  SingleValue,
  NoOptionsMessage,
} from './CustomRender';
import {
  DropdownOption,
  LabelValue,
  OptionRendererProps,
  TagRendererProps,
} from './interfaces';

// css baseclass prefix
const prefix = 'tk-select';

export type DropdownProps<T> = {
  /** Array of options that populate the dropdown menu */
  options: DropdownOption<T>[];
  /** Custom component used to override the default appearance of the list items. */
  optionRenderer?:
    | React.Component<OptionRendererProps<T>, any>
    | React.FunctionComponent<OptionRendererProps<T>>;
  /** Custom component used to override the default appearance of the dropdown select input item/s */
  tagRenderer?:
    | React.Component<TagRendererProps<T>, any>
    | React.FunctionComponent<TagRendererProps<T>>;
  /** Handle blur events on the control */
  onBlur?: (e) => any;
  /** Decides if an item with data and current input value should be displayed in dropdown menu or not */
  filterFunction?: (data: T, inputValue: string) => boolean;
  /** If provided, it renders an icon on the left side of the dropdown input*/
  iconName?: string;
  /** Allows the usage of the component in controlled value mode */
  value?: T;
  /** Mesage to display if there isn't any match in the search input */
  noOptionMessage?: string;
  /** Is the dropdown disabled */
  isDisabled?: boolean;
  /** Placeholder text for the dropdown */
  placeHolder?: string;
  /** Label text for the dropdown */
  label?: string;
  /** If false, user can not type on the control Input */
  isTypeAheadEnabled?: boolean;
  /** Default value selected on the Dropdown */
  defaultValue?: T;
  /** Enables the indicator to expand the Dropdown */
  displayArrowIndicator?: boolean;
  /** Default value selected on the Dropdown */
  id?: string;
  /** Optional CSS class name */
  className?: string;
  /** Close the expanded menu when the user selects an option */
  closeMenuOnSelect?: boolean;
  /** Hide the selected option from the list */
  hideSelectedOptions?: boolean;
  /** Is the select value clearable */
  isInputClearable?: boolean;
} & (OnChangeMultiProps<T> | OnChangeSingleProps<T>);

type OnChangeMultiProps<T> = {
  /** Support multiple selected options */
  isMultiSelect: true;
  /** Handle change events on the Dropdown */
  onChange?: (value: T[]) => any;
};
type OnChangeSingleProps<T> = {
  isMultiSelect?: false;
  onChange?: (value: T) => any;
};

type DropdownState<T> = {
  selectedOption: T;
  closeMenuOnSelect?: boolean;
  hideSelectedOptions?: boolean;
  displayArrowIndicator?: boolean;
};

class Dropdown<T = LabelValue> extends React.Component<
  DropdownProps<T>,
  DropdownState<T>
> {
  state = {
    selectedOption: null,
    hideSelectedOptions:
      this.props?.isMultiSelect || !!this.props?.hideSelectedOptions,
    closeMenuOnSelect: !!(
      !this.props?.isMultiSelect || this.props?.closeMenuOnSelect
    ),
    displayArrowIndicator: !!(
      !this.props?.isMultiSelect || this.props?.displayArrowIndicator
    ),
  };

  handleChange = (selectedOption) => {
    if (this.props.onChange) {
      this.props.onChange(selectedOption);
    }
  };

  handleFiltering = this.props.filterFunction
    ? (option: Option, input: string) => {
      return this.props.filterFunction(option.data, input);
    }
    : undefined;

  render() {
    const {
      hideSelectedOptions,
      closeMenuOnSelect,
      displayArrowIndicator,
    } = this.state;
    const {
      isMultiSelect,
      isDisabled,
      placeHolder,
      options,
      id,
      defaultValue,
      onBlur,
      isInputClearable,
      label,
      optionRenderer,
      iconName,
      tagRenderer,
      value,
      noOptionMessage,
      isTypeAheadEnabled,
    } = this.props;

    return (
      <div>
        <Select
          displayArrowIndicator={displayArrowIndicator}
          optionRenderer={optionRenderer}
          tagRenderer={tagRenderer}
          isClearable={isInputClearable}
          label={label}
          components={{
            DropdownIndicator,
            Control,
            SingleValue,
            Option: DefaultOptionRenderer,
            MultiValueContainer: MultiValueContainerOverride,
            MultiValue: DefaultTagRenderer,
            ClearIndicator,
            MultiValueRemove,
            NoOptionsMessage,
          }}
          defaultValue={defaultValue}
          id={id}
          className={prefix}
          closeMenuOnSelect={closeMenuOnSelect}
          classNamePrefix={prefix}
          value={value}
          onChange={this.handleChange}
          onBlur={onBlur}
          options={options}
          hideSelectedOptions={hideSelectedOptions}
          placeholder={placeHolder}
          isMulti={isMultiSelect}
          isDisabled={isDisabled}
          iconName={iconName}
          noOptionMessage={noOptionMessage}
          filterOption={this.handleFiltering}
          isSearchable={isTypeAheadEnabled}
        />
      </div>
    );
  }

  static defaultProps = {
    isDisabled: false,
    isMultiSelect: false,
    isInputClearable: false,
    isTypeAheadEnabled: true,
  };
}

export default Dropdown;