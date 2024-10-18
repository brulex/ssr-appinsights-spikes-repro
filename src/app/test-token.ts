import {InjectionToken} from "@angular/core";


export interface TestOptions {
  timer?: string | null;
}

export const TestToken = new InjectionToken<(options: TestOptions) => void>('TestToken');
