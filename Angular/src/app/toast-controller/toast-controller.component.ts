import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-controller',
  templateUrl: './toast-controller.component.html',
  styleUrls: ['./toast-controller.component.css']
})
export class ToastControllerComponent implements OnInit {

  show = false;
  autohide = true;
  msg = "";
  success = false;

  constructor() { }

  ngOnInit() {
  }

  showToast(message: string, success: boolean) {
    this.msg = message;
    this.success = success;
    this.show = true;
  }

}
