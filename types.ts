import { PageWithForm, PageWithTable } from './common-classes';

import { Locator, Page } from '@playwright/test';

export type WebUser = {
  login: string;
  password: string;
};

export enum FormItemType {
  TEXT_FIELD,
  TEXTAREA_FIELD,
  SELECT,
}

export type FormItemValue = string | number;

export type FormItem = {
  name: string;
  value: FormItemValue | Array<FormItemValue>;
  type: FormItemType;
  preSubmitValidation?: PreSubmitValidationItem;
};

export type OverrideFormItem = {
  name: FormItem['name'];
  value?: FormItem['value'];
  type?: FormItem['type'];
  preSubmitValidation?: FormItem['preSubmitValidation'];
};

export type FieldFillParams = {
  name: string;
  value: FormItem['value'];
  formElement: Locator;
  page: Page;
};

export type TableItemPrimaryInfo = {
  /** Атрибут колонки data-qa-table-cell */
  name: string;
  /** Значение данной колонки (отображаемый текст) */
  value: FormItemValue;
  isButton?: boolean;
};

export type FormFieldFillMethod = (params: FieldFillParams) => Promise<void>;

export interface IBasePage {
  readonly pagePath: string;

  redirectToPage: () => void;
}

export interface IPageFromCard extends IBasePage {
  readonly cardPageSelector: string;

  moveFromCardToPage: () => void;
}

export interface IPageWithTableBasic {
  readonly table: PageWithTable | undefined;
  readonly apiDeleteUrl?: string;
  readonly tableItemPrimaryInfo?: TableItemPrimaryInfo;
}

export interface IPageWithTable extends IPageWithTableBasic {
  readonly tableSelector: string;
  readonly apiTableUrl: string;
}

export interface IPageWithFormBasic {
  readonly form: PageWithForm;
  readonly formSelector: string;
  readonly apiFormSubmitUrl: string;
  readonly formItems: FormItem[];
  readonly formSubmitButtonSelector?: string;
}

export interface IPageWithForm extends IPageWithFormBasic {
  moveToCreatePage: () => void;
  createObject: () => void;
  directCreateObject: () => void;
}
export type RequestSubmitValidationItem = {
  status: number | number[];
};

export type WaitForApiResponseItem = RequestSubmitValidationItem & {
  url: string;
};

export type PreSubmitValidationItem = {
  isValid: boolean;
};

export type FillFormAndSubmitProps = {
  waitForApiResponse?: WaitForApiResponseItem[];
  submitValidation?: RequestSubmitValidationItem;
};

export type RequestValidationResult = {
  isValid: boolean;
  error?: string;
};

export type RequestValidationResultSummary = Record<keyof RequestSubmitValidationItem, RequestValidationResult>;

export type FormFieldValidationResult = {
  isValid: boolean;
  hasError: boolean;
  message: string;
};
