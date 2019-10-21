import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/ToastController/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  autohide = true;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
  }
}
