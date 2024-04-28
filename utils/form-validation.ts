import { ComponentDataAttributeEnum } from './data-attributes';

import { FormFieldValidationResult, FormItem } from '../types';

import { Locator, Page } from '@playwright/test';

export const throwFailedFormPreSubmitValidations = (messages: string[], formSelector: string) => {
  if (messages.length > 0) {
    throw new Error(
      `Form "${formSelector}" validation failed with "${messages.length}" errors:\n\n` + messages.join('\n'),
    );
  }
};

export const validateFormField = async (formElement: Locator, field: FormItem): Promise<FormFieldValidationResult> => {

  console.log(`form-validation.ts: validateFormField: searching for data control: [${ComponentDataAttributeEnum.CONTROL}="${field.name}"]`); //PDV
  const fieldElement: Locator = formElement.locator(`[${ComponentDataAttributeEnum.CONTROL}="${field.name}"]`);

  let hasError: boolean = false;
  let message: string = '';
  let errorText: string | null;

  try
  {
    console.log(`form-validation.ts: validateFormField: try to getAttribute: data-qa-control-error`);
    errorText = await fieldElement.getAttribute(ComponentDataAttributeEnum.CONTROL_ERROR); 

    hasError = errorText !== null;
  }
  catch
  {
    console.log(`form-validation.ts: validateFormField: catched`);
    hasError = true;
    message = 'No form found!';
  }
  finally {  }
      
  console.log(`form-validation.ts: validateFormField: next tests`);

  const isValid: boolean =
    field.preSubmitValidation?.isValid === undefined || field.preSubmitValidation.isValid !== hasError;

  console.log(`form-validation.ts: validateFormField: isValid="${isValid}", hasError="${hasError}", message="${message}"`);

  if (!isValid) {
    message = `Field "${field.name}" has error: "${errorText}";`;
  }

  console.log(`form-validation.ts: validateFormField: exiting`);
  return {
    isValid,
    hasError,
    message,
  };
};

export const checkFormPreSubmitValidation = async (
  page: Page,
  formSelector: string,
  formItems: FormItem[],
): Promise<boolean> => {
  let isFailed: boolean = false;
  const exceptionMessages: string[] = [];

  const formElement: Locator = page.locator(`[${ComponentDataAttributeEnum.FORM}="${formSelector}"]`);

  for (const field of formItems) {
    const validationResult: FormFieldValidationResult = await validateFormField(formElement, field);

    if (validationResult.hasError)
    {
      if((validationResult.isValid === true)&&(validationResult.message === 'No form found!'))
      {
        console.log(`form-validation.ts: checkFormPreSubmitValidation: The form has already closed, so skip next validations!`);      
        break;
      }

      isFailed = true;
    }

    console.log(`form-validation.ts: checkFormPreSubmitValidation: isFailed="${isFailed}", isValid="${validationResult.isValid}"`);

    if (!validationResult.isValid) {
      exceptionMessages.push(validationResult.message);
    }
  }

  throwFailedFormPreSubmitValidations(exceptionMessages, formSelector);

  return isFailed;
};
