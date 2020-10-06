// import { Component, OnInit } from '@angular/core';
// import { lorem } from "faker";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TEXTS, TEXTSTH } from './mock-texts';
import { Text } from './text.class';
import { Subscription, Subject } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  // randomText = lorem.sentence();
  // enteredText = "";

  // onInput(value: string) {
  //   this.enteredText = value;
  // }

  // compares(randomLetter: string, enteredLetter: string) {
  //   if (!enteredLetter) {
  //     return "pending";
  //   }

  //   return randomLetter === enteredLetter ? "correct" : "incorrect";
  // }

  public text: string = '';
  public form: FormGroup = new FormGroup({text: new FormControl(null)});
  public index: number = 0;
  public error: any;
  public end: boolean = false;
  public tick: any = null;
  public subscription: Subscription = Subscription.EMPTY;
  public totalTime: any;
  public countTypedEntries: number = 0;
  public wpm: number = 0;
  public uncountedErrors: number = 0;
  public accuracy: number = 0;
  public timer: any;
  public subject = new Subject();

  ngOnInit() {
    this.initForm();
    this.initText();
  }

  private initForm() {
    this.form = new FormGroup({
      text: new FormControl(null)
    });
  }

  private resetAllValues() {
    this.text = '';
    this.form = new FormGroup({text: new FormControl(null)});
    this.index = 0;
    this.end = false;
    this.tick = null;
    this.subscription = Subscription.EMPTY;
    this.totalTime = null;
    this.countTypedEntries = 0;
    this.wpm = 0;
    this.uncountedErrors  = 0;
    this.accuracy = 0;
    this.timer = null;
    this.subject = new Subject();
    // this.totalTime = null;
    // this.tick = 0;
    // this.subject.next();
    // if (this.subscription) {
    //   this.subscription = Subscription.EMPTY;
    // }
    // this.index = 0;
    // this.end = false;
    // this.uncountedErrors = 0;
    // this.countTypedEntries = 0;
    // this.text = '';
    // this.wpm = 0;
  }


  private initText() {
    const text = this.getTexts();
    const randomNumberWithinRange = Math.random() * (text.length - 0) + 0;
    const randomIndex = parseInt(JSON.stringify(randomNumberWithinRange), 10);
    this.text = text[randomIndex].text;
  }

  private initText2(){
    const text2 = this.getTexts2();
    const randomNumberWithinRange2 = Math.random() * (text2.length - 0) + 0;
    const randomIndex2 = parseInt(JSON.stringify(randomNumberWithinRange2), 10);
    this.text = text2[randomIndex2].text;
  }

  private onKey(event: any) {

    this.countTypedEntries++;

    if (!this.tick) {
      let timer = TimerObservable.create(1000, 1000);
      this.subscription = timer.subscribe(t => {
        this.tick = t + 2;
      });
    }

    if (event.which === 8) {
      this.index--;
      this.countTypedEntries--;
    }

    if (event.which === 16) {
      this.countTypedEntries--;
      return false;
    }

    this.matchText(event.target.value);

  }

  public changeText() {
    this.resetAllValues();
    this.initForm();
    this.initText();
    // this.initText2()
  }

  private getTexts(): Text[] {
    return TEXTS;
  }
  private getTexts2(): Text[] {
    return TEXTSTH;
  }
  selects(event:any){
    console.log(event.target.value)
    if(event.target.value == "TH"){
      this.initText2()
    }else{
      this.initText()
    }
  }
  private matchText(value:any) {

    const splitGivenText = this.text.split("");
    const splitUserText = value.split("");

    if (!splitGivenText) {
      return false;
    }

    if (splitUserText[this.index] == splitGivenText[this.index]) {
      this.error = false;
      this.index++;
      if (splitGivenText.length === this.index) {
        this.end = true;
        this.totalTime = this.tick / 60;
        this.calculateWPM();
      } else {
        this.end = false;
      }
    } else {
      this.uncountedErrors++;
      this.error = true;
    }

  }

  private calculateWPM() {
    const grossWPM = ((this.countTypedEntries / 5) / this.totalTime);
    const errorRate = this.uncountedErrors / this.totalTime;
    this.accuracy = 100 - ((this.uncountedErrors / this.countTypedEntries) * 100);
    this.wpm = Math.abs(grossWPM - errorRate);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subject.unsubscribe();
  }


}
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { TEXTS, TEXTSTH } from './mock-texts';
// import { Text } from './text.class';
// import { Subscription, Subject } from "rxjs";
// import { TimerObservable } from "rxjs/observable/TimerObservable";


// @Component({
//   selector: 'app-homepage',
//   templateUrl: './homepage.component.html',
//   styleUrls: ['./homepage.component.css']
// })

// export class AppComponent {

//   public text: string;
//   public text2: string;
//   public  form: FormGroup;
//   public index: number = 0;
//   public error: any;
//   public end: boolean = false;
//   public tick: any = null;
//   public subscription: Subscription;
//   public totalTime: any;
//   public countTypedEntries: number = 0;
//   public wpm: number;
//   public uncountedErrors: number = 0;
//   public accuracy: number;
//   public timer: any;
//   public subject = new Subject();

//   ngOnInit() {
//     this.initForm();
//     this.initText();
//   }

//   private initForm() {
//     this.form = new FormGroup({
//       text: new FormControl(null)
//     });
//   }

//   private resetAllValues() {
//     this.totalTime = null;
//     this.tick = 0;
//     this.subject.next();
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//     this.index = 0;
//     this.end = false;
//     this.uncountedErrors = 0;
//     this.countTypedEntries = 0;
//     this.text = null;
//     this.text2 = null;
//     this.wpm = null;
//   }


//   private initText() {
//     const text = this.getTexts();
//     const randomNumberWithinRange = Math.random() * (text.length - 0) + 0;
//     const randomIndex = parseInt(JSON.stringify(randomNumberWithinRange), 10);
//     this.text = text[randomIndex].text;
//   }

//   private initText2(){
//     const text2 = this.getTexts2();
//     const randomNumberWithinRange2 = Math.random() * (text2.length - 0) + 0;
//     const randomIndex2 = parseInt(JSON.stringify(randomNumberWithinRange2), 10);
//     this.text = text2[randomIndex2].text;
//   }

//   private onKey(event: any) {

//     this.countTypedEntries++;

//     if (!this.tick) {
//       let timer = TimerObservable.create(1000, 1000);
//       this.subscription = timer.takeUntil(this.subject).subscribe(t => {
//         this.tick = t + 2;
//       });
//     }

//     if (event.which === 8) {
//       this.index--;
//       this.countTypedEntries--;
//     }

//     if (event.which === 16) {
//       this.countTypedEntries--;
//       return false;
//     }

//     this.matchText(event.target.value);

//   }

//   public changeText() {
//     this.resetAllValues();
//     this.initForm();
//     // this.initText();
//     this.initText2()
//   }

//   private getTexts(): Text[] {
//     return TEXTS;
//   }
//   private getTexts2(): Text[] {
//     return TEXTSTH;
//   }
//   selects(event:any){
//     console.log(event.target.value)
//     if(event.target.value == "TH"){
//       this.initText2()
//     }else{
//       this.initText()
//     }
//   }
//   private matchText(value) {

//     const splitGivenText = this.text.split("");
//     const splitUserText = value.split("");

//     if (!splitGivenText) {
//       return false;
//     }

//     if (splitUserText[this.index] == splitGivenText[this.index]) {
//       this.error = false;
//       this.index++;
//       if (splitGivenText.length === this.index) {
//         this.end = true;
//         this.totalTime = this.tick / 60;
//         this.calculateWPM();
//       } else {
//         this.end = false;
//       }
//     } else {
//       this.uncountedErrors++;
//       this.error = true;
//     }
//   }

//   private calculateWPM() {
//     const grossWPM = ((this.countTypedEntries / 5) / this.totalTime);
//     const errorRate = this.uncountedErrors / this.totalTime;
//     this.accuracy = 100 - ((this.uncountedErrors / this.countTypedEntries) * 100);
//     this.wpm = Math.abs(grossWPM - errorRate);
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//     this.subject.unsubscribe();
//   }
// }




