import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HelloComponent } from './hello.component';
import { state, style, animate, transition, trigger, AnimationMetadata } from '@angular/animations';
import { fromEvent  } from 'rxjs';
import { throttleTime, share, filter, map, pairwise, distinctUntilChanged } from 'rxjs/operators';
enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent implements AfterViewInit {
  pages = new Array(10);
  private isVisible = true;
  // @HostBinding('@toggle')
  // get toggle(): VisibilityState {
  //   return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  // } 

  private snackBarCreated: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(): void {
    this.snackBar.openFromComponent(HelloComponent, {verticalPosition : 'top'});
    // if (this.snackBarCreated) {
    //   this.snackBar.dismiss();
    // } else {
    //   this.snackBar.openFromComponent(HelloComponent);
    // }
    // this.snackBarCreated = !this.snackBarCreated; 
  }

  closeSnackBar(): void {
    this.snackBar.dismiss();
  }

  ngAfterViewInit() { 
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share(),
    );

    const scrollUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );
    
    const scrollDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );
    scrollUp$.subscribe(() => ( this.closeSnackBar() ));
    scrollDown$.subscribe(() => (this.openSnackBar()));
  }
}
