import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
//[property] performs one-way binding from the component to the DOM
//[(ngModel)] performs two-way binding between the component and the DOM
export class Home implements OnInit,OnDestroy{
  portalName='Student Course Portal';
  isPortalActive=true;
  message='';
  searchTerm='';
  onEnrollClick()
  {
    this.message='Enrollment opened';
  }
  availableCourses=0;
  ngOnInit(): 
  void{
    this.availableCourses=12;
    console.log('HomeComponent initialised-courses loaded');
  }
  ngOnDestroy(): 
  void
  {
    console.log('HomeComponent destroyed');
  }
}
