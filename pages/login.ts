import { BasePage, PageWithForm } from '../common-classes';
import { FormItem, FormItemType, IPageWithFormBasic, OverrideFormItem } from '../types';
import { ROOT_PAGE_ADDRESS, overrideFormItems } from '../utils';

import { BrowserContext, Page } from '@playwright/test';

class LoginPage extends BasePage implements IPageWithFormBasic {
  public readonly form: PageWithForm;
  public readonly formSelector: string = 'SignInForm';
  public readonly apiFormSubmitUrl: string = '/api/Admin/Login/CreateLogin';
  public readonly formSubmitButtonSelector: string = 'handleLogin';
  public readonly formItems: FormItem[] = [
    {
      name: 'login',
      value: '', //PDV
      type: FormItemType.TEXT_FIELD,
    },
    {
      name: 'password',
      value: '', //PDV
      type: FormItemType.TEXT_FIELD,
    },
  ];

  constructor(page: Page, formItemOverride?: OverrideFormItem[]) {
    super(page, '/login');

    this.formItems = overrideFormItems(this.formItems, formItemOverride);

    this.form = new PageWithForm(
      page,
      this.formSelector,
      this.formItems,
      this.apiFormSubmitUrl,
      this.formSubmitButtonSelector,
    );
  }

  async redirectToRoot() {
    await this.page.goto(ROOT_PAGE_ADDRESS);
  }

  getDirectAuthRequestBody(): Record<string, string> {
    const requestBody: Record<string, string> = {};
    this.formItems.forEach((item) => {
      requestBody[item.name] = item.value?.toString();
    });

    return requestBody;
  }

  async directAuth(context: BrowserContext) {
    const requestBody: Record<string, string> = this.getDirectAuthRequestBody();

    await context.request.post(`${ROOT_PAGE_ADDRESS}${this.apiFormSubmitUrl}`, {
      data: requestBody,
    });
  }
}

export default LoginPage;
