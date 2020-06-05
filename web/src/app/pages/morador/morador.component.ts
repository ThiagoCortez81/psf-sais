import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var $: any;



@Component({
  selector: 'app-morador',
  templateUrl: './morador.component.html',
  styleUrls: ['./morador.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MoradorComponent implements OnInit {

  constructor(private ws: WebSocketEventMap, private elementRef: ElementRef, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

}
