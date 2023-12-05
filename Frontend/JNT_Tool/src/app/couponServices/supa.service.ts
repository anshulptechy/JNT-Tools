// import { Injectable } from '@angular/core';
// import { AuthChangeEvent, SupabaseClient, User, createClient } from '@supabase/supabase-js';
// import { environment } from '../environment/environment.development';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SupaService {
//   private supabase_client!: SupabaseClient;
//   private authState$: Subject<AuthChangeEvent | null> = new Subject<AuthChangeEvent | null>();

//   constructor() { debugger;
//     this.supabase_client = createClient(environment.supabase.url, environment.supabase.key);

//     this.supabase_client.auth.onAuthStateChange((event) => {
//       this.authState$.next(event);
//     });
//    }

// // Extract user ID
// extractUserId(user?: User | null): string | null { debugger;
//   return user?.id ?? null;
// }

//   async getUserDetails(): Promise<User | null> { debugger;
//     try {
//       const { data, error } = await this.supabase_client.auth.getUser();

//       if (error) {
//         console.error('Error fetching user details:', error.message);
//         return null;
//       }

//       if (data) {
//         return data.user as User;
//       }

//       return null;
//     } catch (error) {
//       console.error('Error fetching user details:', (error as Error).message);
//       return null;
//     }
//   }
// }
