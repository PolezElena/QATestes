import { FormItem, OverrideFormItem } from '../types';

export const overrideFormItems = (defaultFormItems: FormItem[], overrideItems?: OverrideFormItem[]) =>
  defaultFormItems.map((item) => {
    const overrideItem: OverrideFormItem | undefined = overrideItems?.find((x) => x.name === item.name);
    let newItem: FormItem = item;

    if (overrideItem) {
      newItem = { ...item, ...overrideItem };
    }

    return newItem;
  });

export const getLoginFromOverrideUserItem = (overrideUser: OverrideFormItem[]): string | undefined => {
  const field: OverrideFormItem | undefined = overrideUser.find((x) => x.name === 'login');
  return field?.value?.toString();
};
