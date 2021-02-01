import { TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export interface AlertModel {
  message: string | TemplateRef<NgTemplateOutlet>;
  type?: AlertTypeModel;
}

export enum AlertTypeModel {
  error = 'Error',
  warning = 'Warning',
  success = 'Success',
}
