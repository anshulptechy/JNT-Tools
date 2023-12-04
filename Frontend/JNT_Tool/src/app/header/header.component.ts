import { Component, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showCouponDetailsFlag = false;
  supabase = createClient(
    'https://lqviihvmwdkabqlpecxh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdmlpaHZtd2RrYWJxbHBlY3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMzgxNDAsImV4cCI6MjAxNDkxNDE0MH0.970stIqUsgdhPxejzbb-6R39pDOAx3J4rIGWz_c6ZAM'
  );

  

  constructor(private auth: SupabaseService, private router: Router) {}

  ngOnInit() {
    const storedFirstName = localStorage.getItem('tenantName');

    // Set the value to loggedInUserName if it exists
    if (storedFirstName) {
      this.loggedInUserName = storedFirstName;
    }
  }
  showCouponDetails() {
    this.showCouponDetailsFlag = true;

  }

  loggedInUserName: string = '';

  logOut() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful!',
      text: 'User Logout successful',
    });
  }
}
