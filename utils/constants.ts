import { OverrideFormItem } from '../types';

export const ROOT_PAGE_ADDRESS = 'http://89.17.62.179:62641/'
// export const ROOT_PAGE_ADDRESS: string = 'http://localhost:3000';

export const OVERRIDE_SYSTEM_USERS: OverrideFormItem[][] = [
  [
    {
      name: 'login',
      value: 'SystemAdmin',
    },
   {
      name: 'password',
      value: 'StreamLabs',
    },
  ], 
 /*   [
     {
      name: 'login',
       value: 'Engineer',
     },
     {
       name: 'password',
       value: 'StreamLabs',
     },
   ],
   [
  {
      name: 'login',
     value: 'Operator',
  },
    {
      name: 'password',
      value: 'StreamLabs',
    },
   ],
   [
     {
       name: 'login',
       value: 'Viewer',
     },
     {
       name: 'password',
      value: 'StreamLabs',
     },
  ],*/
];
