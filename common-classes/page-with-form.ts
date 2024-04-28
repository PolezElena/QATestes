import { FillFormAndSubmitProps, FormItem } from '../types';
import {
  ComponentDataAttributeEnum,
  checkFormPreSubmitValidation,
  fillFormFields,
  waitForResponseAndValidate,
} from '../utils';

import { Page } from '@playwright/test';

class PageWithForm {
  private page: Page;

  private readonly formSelector: string;
  private readonly formItems: FormItem[];
  private readonly submitApiUrl: string;
  private readonly submitButtonSelector: string;

  constructor(
    page: Page,
    formSelector: string,
    formItems: FormItem[],
    submitApiUrl: string,
    submitButtonSelector?: string,
  ) {
    this.page = page;

    this.formSelector = formSelector;
    this.formItems = formItems;
    this.submitApiUrl = submitApiUrl;
    this.submitButtonSelector = submitButtonSelector ?? 'handleSaveEntity';
  }
/*
  async fillFormAndSubmit(props?: FillFormAndSubmitProps) {
    console.log('fillFormFields 0')//PDV

    await fillFormFields(this.formSelector, this.formItems, this.page);

    console.log('fillFormFields 1')//PDV
    if (props?.waitForApiResponse) {
      for (const apiMethod of props.waitForApiResponse) {
        await waitForResponseAndValidate(this.page, apiMethod.url, apiMethod);
      }
    }

    console.log('fillFormFields 2')//PDV

    //PDV
    try{
      console.log('submitFormValues first try')
      await this.submitFormValues(props?.submitValidation);
    }
    catch (error) {
      console.error(error.message);
      console.log('submitFormValues second try')
      await this.submitFormValues(props?.submitValidation);
    } finally {
      //await browser.close();
    }

    console.log('Object has been successfully created');
  }*/

  async fillForm(props?: FillFormAndSubmitProps) {
    console.log('page-with-forms.ts: fillForm: Start fillForm')//PDV

    await fillFormFields(this.formSelector, this.formItems, this.page);

    console.log('page-with-forms.ts: fillForm: fillFormFields 1')//PDV
    if (props?.waitForApiResponse) {
      for (const apiMethod of props.waitForApiResponse) {
        await waitForResponseAndValidate(this.page, apiMethod.url, apiMethod);
      }
    }

    console.log('page-with-forms.ts: fillForm: Form has successfully filled');
  }

  async skipValidate(props?: FillFormAndSubmitProps) {
    console.log('page-with-forms.ts: skipValidate: skipping')//PDV

    const submitButton = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="${this.submitButtonSelector}"]`);
     await submitButton.click();
  }
  
  async submitForm(props?: FillFormAndSubmitProps) {
    console.log('page-with-forms.ts: submitForm: Start submiting form')//PDV

    //PDV
    console.log('page-with-forms.ts: submitForm: submitFormValues first try')
    await this.submitFormValues(props?.submitValidation);
    //await browser.close();

    console.log('page-with-forms.ts: submitForm: Crated object has been successfully submited');
  }

  private async submitFormValues(submitValidation: FillFormAndSubmitProps['submitValidation']) {
    console.log(`page-with-forms.ts: submitFormValues: searching for button to clock: [${ComponentDataAttributeEnum.BUTTON}="${this.submitButtonSelector}"]`);
    
    const submitButton = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="${this.submitButtonSelector}"]`);
     await submitButton.click();
   

    const hasPreSubmitErrors: boolean = await checkFormPreSubmitValidation(
      this.page,
      this.formSelector,
      this.formItems,
    );

    if (!hasPreSubmitErrors) {
      await waitForResponseAndValidate(this.page, this.submitApiUrl, submitValidation);
    }
  }
}

export default PageWithForm;
