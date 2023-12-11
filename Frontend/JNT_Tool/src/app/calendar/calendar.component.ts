// Step 1: Import necessary modules and components
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MeetService } from '../services/meet.service';
import { OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';

// Step 2: Declare necessary global variables and plugins
declare const gapi: any;
declare const google: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  // Step 3: Declare class properties
  selectedEvent: any;
  isAddEventFormOpen: boolean = false;
  isEditEventFormOpen: boolean = false;
  intervalSubscription!: Subscription;

  newEvent: any = {
    title: '',
    start: '',
    end: '',
  };

  // Step 4: Declare and define class methods

  // FullCalendar options
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    eventClick: this.handleEventClick.bind(this), 
    selectable: false,
    select: (selectInfo: any) => this.handleDateSelect(selectInfo),
  };

  // Google Calendar API configuration
  CLIENT_ID =
    '203741688306-35hgku688pkkintre7i6uc4jeuufcn4d.apps.googleusercontent.com';
  API_KEY = 'AIzaSyCZlJBzJpCwdwd3q-tFdAg2TZBLKu1ahtQ';
  DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  SCOPES = 'https://www.googleapis.com/auth/calendar';

  tokenClient: any;
  gapiInited = false;
  gisInited = false;

  constructor(private meetservice: MeetService,  private router: Router, ) {}


  // OnInit lifecycle hook
  ngOnInit() {
    this.calendarOptions.eventClick = undefined;
    const authorizeButton = document.getElementById('authorize_button');
    const signoutButton = document.getElementById('signout_button');

    if (authorizeButton) {
      authorizeButton.style.visibility = 'visible';
    }

    if (signoutButton) {
      const userId = localStorage.getItem('userId');
      const storedEvents = localStorage.getItem(`calendarEvents_${userId}`);
      if (storedEvents) {
        authorizeButton!.innerText = 'Refresh';
        signoutButton.style.visibility = 'visible';
      } else {
        signoutButton.style.visibility = 'hidden';
      }
    }

    // Move the script loading inside ngOnInit
    this.loadScripts();
    this.loadEvents();
  }

  //OnDestroy lifecycle hook
  ngOnDestroy() {
    // Unsubscribe from the interval to prevent memory leaks
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  loadScripts() {
    // Load the gapi script
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.async = true;
    gapiScript.onload = () => this.gapiLoaded();
    document.head.appendChild(gapiScript);

    // Load the gis script
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.async = true;
    gisScript.onload = () => this.gisLoaded();
    document.head.appendChild(gisScript);
  }
  // Gapi loaded method
  gapiLoaded() {
    gapi.load('client', this.initializeGapiClient.bind(this));
  }

  // Initialize Gapi client
  async initializeGapiClient() {
    await gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    });
    this.gapiInited = true;
    this.maybeEnableButtons();
  }

  // Gis loaded method
  gisLoaded() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '', // defined later
    });
    this.gisInited = true;
    this.maybeEnableButtons();
  }

  // Enable buttons when both Gapi and Gis are initialized
  maybeEnableButtons() {
    const authorizeButton = document.getElementById('authorize_button');
    if (this.gapiInited && this.gisInited && authorizeButton) {
      authorizeButton.style.visibility = 'visible';
    }
  }

  // Load events from local storage
  loadEvents() {
    const userId = localStorage.getItem('userId');
    // Retrieve events from local storage
    const storedEvents = localStorage.getItem(`calendarEvents_${userId}`);
    if (storedEvents) {
      this.calendarOptions.events = JSON.parse(storedEvents);
    }
  }

  // Handle authentication click
  handleAuthClick() {
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      const signoutButton = document.getElementById('signout_button');
      if (signoutButton) {
        signoutButton.style.visibility = 'visible';
      }
      const authorizeButton = document.getElementById('authorize_button');
      if (authorizeButton) {
        authorizeButton.innerText = 'Refresh';
      }
      this.calendarOptions.selectable = true;
      this.listUpcomingEvents();

      //Start the interval
      this.intervalSubscription = interval(6000).subscribe(() => {
        this.listUpcomingEvents();
      });
    };

    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      this.tokenClient.requestAccessToken({ prompt: '' });
    }
    this.calendarOptions.eventClick = this.handleEventClick.bind(this);
  }

  // Handle signout click
  handleSignoutClick() {
    const userId = localStorage.getItem('userId');
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      // Clear the events array to remove the user's events
      this.calendarOptions.events = [];
      // Clear local storage
      localStorage.removeItem(`calendarEvents_${userId}`);
      const authorizeButton = document.getElementById('authorize_button');
      if (authorizeButton) {
        authorizeButton.innerText = 'Sync';
      }
      const signoutButton = document.getElementById('signout_button');
      if (signoutButton) {
        signoutButton.style.visibility = 'hidden';
      }
      this.calendarOptions.selectable = false;
      // Unsubscribe from the interval to prevent memory leaks
      if (this.intervalSubscription) {
        this.intervalSubscription.unsubscribe();
      }
    } else {
      this.calendarOptions.events = [];

      // Clear local storage
      localStorage.removeItem(`calendarEvents_${userId}`);
      const authorizeButton = document.getElementById('authorize_button');
      if (authorizeButton) {
        authorizeButton.innerText = 'Sync';
      }
      const signoutButton = document.getElementById('signout_button');
      if (signoutButton) {
        signoutButton.style.visibility = 'hidden';
      }
    }
  }

  // Handle event click
  handleEventClick(info: any) {
    const event = info.event;
    this.selectedEvent = {
      title: event.title,
      start: event.start,
      end: event.end,
      userId: event.extendedProps.userId,
      googleCalendarEventId: event.extendedProps.googleCalendarEventId,
    };
    this.showModal();
  }

  // Show modal
  showModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Close modal
  closeModal() {
    this.selectedEvent = null;

    // Close both add and edit modals
    this.isAddEventFormOpen = false;
    this.isEditEventFormOpen = false;

    // Clear the values in the modal
    this.newEvent = {
      title: '',
      start: '',
      end: '',
    };

    const modal = document.querySelector('.modal, .modal2') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Callback for handling date selection
  handleDateSelect(selectInfo: any) {
    // Extract the selected date
    const selectedDate = new Date(selectInfo.startStr);
    // Format the start date as a string with the time set to midnight
    const formattedStartDate =
      selectedDate.toISOString().split('T')[0] + 'T00:00';
    // Calculate the next day as the end date
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate());
    // Set the time of the end date
    const formattedEndDate = endDate.toISOString().split('T')[0] + 'T23:59';
    // Set the selected dates in the new event object
    this.newEvent.start = formattedStartDate;
    this.newEvent.end = formattedEndDate;
    // Update the input fields in the modal
    const eventStartInput = document.getElementById(
      'eventStart'
    ) as HTMLInputElement;
    const eventEndInput = document.getElementById(
      'eventEnd'
    ) as HTMLInputElement;

    if (eventStartInput && eventEndInput) {
      this.newEvent.start = formattedStartDate;
      this.newEvent.end = formattedEndDate;

      eventStartInput.value = this.newEvent.start;
      eventEndInput.value = this.newEvent.end;
    }

    this.openAddEventForm();
  }

  // Method to open the Add Event form
  openAddEventForm() {
    this.isAddEventFormOpen = true;
    // Open the Add Event form
    setTimeout(() => {
      // Ensure that only the modal for adding an event is displayed
      const addEventModal = document.querySelector('.modal2') as HTMLElement;
      if (addEventModal) {
        addEventModal.style.display = 'block';
      }

      // Hide the modal for displaying event details if it's open
      const eventDetailsModal = document.querySelector('.modal') as HTMLElement;
      if (eventDetailsModal) {
        eventDetailsModal.style.display = 'none';
      }
    }, 0);
  }

  // List upcoming events
  async listUpcomingEvents() {
    try {
      const userId = localStorage.getItem('userId');
      const request = {
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 90,
        orderBy: 'startTime',
        userId: userId,
      };
      const response = await gapi.client.calendar.events.list(request);

      const events = response.result.items;
      if (!events || events.length === 0) {
        // If there are no events left, set calendarOptions.events to an empty array
        this.calendarOptions.events = [];
      }

      this.calendarOptions.events = [];

      const calendarEvents = events.map((event: any) => {
        return {
          title: event.summary,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          userId: userId,
          googleCalendarEventId: event.id,
        };
      });

      // Add the events to the FullCalendar display
      this.calendarOptions.events = calendarEvents;

      this.meetservice.addEvent(calendarEvents).subscribe({
        next: (response) => {
          console.log('Events stored successfully:', response);
          localStorage.setItem(
            `calendarEvents_${userId}`,
            JSON.stringify(calendarEvents)
          );
        },
        error: (error) => {
          console.error('Error storing events:', error);
        },
      });

      // Delete events that are no longer in Google Calendar
      this.deleteRemovedEvents(calendarEvents);
    } catch (err: any) {
      console.error('Error fetching events:', err);
    }
  }

  // Delete removed events
  deleteRemovedEvents(currentEvents: any[]) {
    const userId = localStorage.getItem('userId');
    // Retrieve previously stored events
    const storedEvents = JSON.parse(
      localStorage.getItem(`calendarEvents_${userId}`) || '[]'
    );

    // Identify events that are no longer present
    const removedEvents = storedEvents.filter((storedEvent: any) => {
      return !currentEvents.some(
        (currentEvent) =>
          currentEvent.googleCalendarEventId ===
          storedEvent.googleCalendarEventId
      );
    });

    // Delete removed events from the backend
    removedEvents.forEach((removedEvent: any) => {
      this.meetservice.deleteEvent(removedEvent).subscribe(
        (response) => {
          console.log('Event deleted from backend successfully:', response);
        },
        (error) => {
        }
      );
    });
  }

  // Add event
  addEvent() {
    // Check if the new event has valid data
    if (!this.newEvent.title || !this.newEvent.start || !this.newEvent.end) {
      alert('Please enter all event details.');
      return;
    }
    const calendarEvent = {
      title: this.newEvent.title,
      start: this.newEvent.start,
      end: this.newEvent.end,
    };
    this.calendarOptions.events = [
      ...(this.calendarOptions.events as any),
      calendarEvent,
    ];

    // Add the event to Google Calendar
    this.addEventToGoogleCalendar(calendarEvent);

    // Reset the new event form
    this.newEvent = {
      title: '',
      start: '',
      end: '',
    };

    // Close the Add Event form
    this.isAddEventFormOpen = false;
  }

  // Add event to Google Calendar
  addEventToGoogleCalendar(event: any) {
    const userId = localStorage.getItem('userId');

    // Format dates to ISO 8601
    const formattedStart = new Date(event.start).toISOString();
    const formattedEnd = new Date(event.end).toISOString();

    const googleEvent = {
      summary: event.title,
      start: {
        dateTime: formattedStart,
        timeZone: 'UTC',
      },
      end: {
        dateTime: formattedEnd,
        timeZone: 'UTC',
      },
    };

    gapi.client.calendar.events
      .insert({
        calendarId: 'primary',
        resource: googleEvent,
      })
      .then((response: any) => {
        console.log('Event added to Google Calendar:', response);
        // After successful adding into Google Calendar, update FullCalendar
        this.listUpcomingEvents();
        // Optionally, you can update the event in your local storage with the Google Calendar event ID
        const updatedEvents = (this.calendarOptions.events as any).map(
          (calEvent: any) => {
            if (
              calEvent.title === event.title &&
              calEvent.start === event.start &&
              calEvent.end === event.end
            ) {
              return {
                ...calEvent,
                googleCalendarEventId: response.result.id,
              };
            }
            return calEvent;
          }
        );

        this.calendarOptions.events = updatedEvents;
        localStorage.setItem(
          `calendarEvents_${userId}`,
          JSON.stringify(updatedEvents)
        );
      })
      .catch((error: any) => {
        console.error('Error adding event to Google Calendar:', error);
      });
  }

  // Remove event
  removeEvent() {
    // Check if the selectedEvent has the necessary properties
    if (
      this.selectedEvent &&
      this.selectedEvent.title &&
      this.selectedEvent.start &&
      this.selectedEvent.end
    ) {
      // Remove the event from Google Calendar
      this.removeEventFromGoogleCalendar(this.selectedEvent);
    }
    // Remove the event from FullCalendar
    const updatedEvents = (this.calendarOptions.events as any).filter(
      (calEvent: any) => {
        return !(
          calEvent.title === this.selectedEvent.title &&
          calEvent.start === this.selectedEvent.start &&
          calEvent.end === this.selectedEvent.end
        );
      }
    );

    const userId = localStorage.getItem('userId');

    if (updatedEvents.length === 0) {
      // If there are no events left, set calendarOptions.events to an empty array
      this.calendarOptions.events = [];
      localStorage.removeItem(`calendarEvents_${userId}`);
    } else {
      this.calendarOptions.events = updatedEvents;
      localStorage.setItem(
        `calendarEvents_${userId}`,
        JSON.stringify(updatedEvents)
      );
    }

    // Close the modal
    this.closeModal();
  }

  // Remove event from Google Calendar
  removeEventFromGoogleCalendar(event: any) {
    const userId = localStorage.getItem('userId');

    // Format dates to ISO 8601
    const formattedStart = new Date(event.start).toISOString();
    const formattedEnd = new Date(event.end).toISOString();

    // Search for the event in Google Calendar using its properties
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: formattedStart,
        timeMax: formattedEnd,
        q: event.title,
      })
      .then((response: any) => {
        const events = response.result.items;

        if (events && events.length > 0) {
          // Assuming there's only one matching event; you might need to refine this logic
          const googleEventId = events[0].id;

          // Delete the event from Google Calendar
          gapi.client.calendar.events
            .delete({
              calendarId: 'primary',
              eventId: googleEventId,
            })
            .then((deleteResponse: any) => {
              console.log(
                'Event removed from Google Calendar:',
                deleteResponse
              );
            })
            .catch((deleteError: any) => {
              console.error(
                'Error removing event from Google Calendar:',
                deleteError
              );
            });
        }
      })
      .catch((error: any) => {
        console.error('Error searching for event in Google Calendar:', error);
      });
  }

  openEditForm() {
    this.isEditEventFormOpen = true;
    // Populate the newEvent object with the selected event details for editing
    this.newEvent = {
      title: this.selectedEvent.title,
      start: this.formatForInput(this.selectedEvent.start),
      end: this.formatForInput(this.selectedEvent.end),
    };
    // Close the add event form
    this.isAddEventFormOpen = false;

    // Open the edit modal
    setTimeout(() => {
      const editEventModal = document.querySelector('.modal2') as HTMLElement;
      if (editEventModal) {
        editEventModal.style.display = 'block';
      }
      const eventDetailsModal = document.querySelector('.modal') as HTMLElement;
      if (eventDetailsModal) {
        eventDetailsModal.style.display = 'none';
      }
    }, 0);
  }

  // Helper method to format date for input
  formatForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
  updateEvent() {
    const updatedEvent = {
      ...this.selectedEvent,
      title: this.newEvent.title,
      start: this.newEvent.start,
      end: this.newEvent.end,
      userId: this.selectedEvent.userId,
      googleCalendarEventId: this.selectedEvent.googleCalendarEventId,
    };

    // Call the backend API to update the event
    this.meetservice.updateEvent(updatedEvent).subscribe({
      next: (response) => {
        // Update the event in FullCalendar display
        const updatedEvents = (this.calendarOptions.events as any).map(
          (calEvent: any) => {
            if (
              calEvent.googleCalendarEventId ===
              this.selectedEvent.googleCalendarEventId
            ) {
              return updatedEvent;
            }
            return calEvent;
          }
        );
        this.calendarOptions.events = updatedEvents;

        // Update the event in local storage
        const userId = localStorage.getItem('userId');
        localStorage.setItem(
          `calendarEvents_${userId}`,
          JSON.stringify(updatedEvents)
        );

        // Update the event in Google Calendar
        this.updateEventInGoogleCalendar(updatedEvent);

        // Close the edit modal
        this.isEditEventFormOpen = false;

        // Close the Add Event form
        this.isAddEventFormOpen = false;
      },
      error: (error) => {
        console.error('Error updating event:', error);

        // Log specific error details
        if (error.error && error.error.errors) {
          console.log('Validation errors:', error.error.errors);
        }

        // Handle error if needed
      },
    });
  }

  updateEventInGoogleCalendar(updatedEvent: any) {
    // Format dates to ISO 8601
    const formattedStart = new Date(updatedEvent.start).toISOString();
    const formattedEnd = new Date(updatedEvent.end).toISOString();

    // Construct the updated event for Google Calendar
    const googleEvent = {
      summary: updatedEvent.title,
      start: {
        dateTime: formattedStart,
        timeZone: 'UTC',
      },
      end: {
        dateTime: formattedEnd,
        timeZone: 'UTC',
      },
    };

    // Use the Google Calendar API to update the event
    gapi.client.calendar.events
      .update({
        calendarId: 'primary',
        eventId: updatedEvent.googleCalendarEventId, // Make sure to include the event ID
        resource: googleEvent,
      })
      .then((response: any) => {
        console.log('Event updated in Google Calendar:', response);
      })
      .catch((error: any) => {
        console.error('Error updating event in Google Calendar:', error);
      });
  }
}
