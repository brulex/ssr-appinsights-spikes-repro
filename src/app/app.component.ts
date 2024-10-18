import {Component, inject, NgZone} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {TestToken} from "./test-token";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  tests = inject(TestToken, { optional: true });
  location = inject(Location);
  activatedRoute = inject(ActivatedRoute);
  ngZone = inject(NgZone);
  title = 'angular-ssr-appinsights-spikes-repro';

  constructor() {
    this.executeTests();
  }

  executeTests(): void {
    if (!this.tests) {
      return;
    }
    const testsFn = this.tests
    const url = new URL(this.location.path(), 'http://localhost:3000/');

    const timer = url.searchParams.get('timer');
    const outsideZone = url.searchParams.get('outsideZone') === 'true';

    console.log({ timer, outsideZone })

    if (outsideZone) {
      this.ngZone.runOutsideAngular(() => testsFn({ timer }))
    } else {
      testsFn({ timer });
    }
  }
}
