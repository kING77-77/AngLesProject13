import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MySerService } from './my-ser.service';

export const candeactivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const service = inject(MySerService);
  if (service.isDirty) {
    return confirm("");
  }
  return true;
};