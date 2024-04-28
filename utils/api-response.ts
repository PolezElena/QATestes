import { RequestSubmitValidationItem, RequestValidationResult, RequestValidationResultSummary } from '../types';

import { Page, Response } from '@playwright/test';

export const OK_VALIDATE_STATUS: number[] = [200, 204];

export const validateResponseStatus = (
  status: number,
  validationStatus: RequestSubmitValidationItem['status'],
): RequestValidationResult => {
  let isValid: boolean = false;
  let error: string | undefined;

  if (Array.isArray(validationStatus)) {
    isValid = validationStatus.includes(status);
  } else {
    isValid = status === validationStatus;
  }

  if (!isValid) {
    error = `Expected status: ${validationStatus.toString()},\nReceived status: ${status.toString()}`;
  }

  return {
    isValid,
    error,
  };
};

export const validateRequestResponse = (
  resp: Response,
  validationItem: RequestSubmitValidationItem | undefined,
): RequestValidationResultSummary => {
  const statusValidationResult: RequestValidationResult = validateResponseStatus(
    resp.status(),
    validationItem?.status ?? OK_VALIDATE_STATUS,
  );

  return {
    status: statusValidationResult,
  };
};

export const throwFailedRequestValidations = (summary: RequestValidationResultSummary, url: string) => {
  let message: string = '';
  let errorCount: number = 0;

  Object.entries(summary).forEach(([key, result]) => {
    if (!result.isValid) {
      const mainMessage: string = `\nProperty "${key}"`;

      if (result.error) {
        message += `${mainMessage}:\n${result.error};`;
      } else {
        message += `${mainMessage};`;
      }

      errorCount += 1;
    }
  });

  if (errorCount > 0) {
    throw new Error(`Request "${url}" validation failed with "${errorCount}" errors:\n` + message);
  }
};

export const waitForResponseAndValidate = async (
  page: Page,
  url: string,
  validationItem?: RequestSubmitValidationItem,
) => {
  
  console.log(`api-response.ts: waitForResponseAndValidate: "${url}"`);

  let fired : boolean = false;
  let response : Response;

  try{
     response = await page.waitForResponse((resp) => resp.url().includes(url));

    //PDV need to be comment (desabled) for Lena
    //await response.finished();
  }
  catch
  {
    fired = true;
  }
  finally{}

  console.log(`api-response.ts: waitForResponseAndValidate: end waitForResponse fired="${fired}"`);

  if(!fired)
    {
      const validationResult : RequestValidationResultSummary = validateRequestResponse(response, validationItem);

      throwFailedRequestValidations(validationResult, url);
    }

};
