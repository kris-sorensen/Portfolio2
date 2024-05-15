export interface IEvent {
  title: string;
  date: string;
  time: string;
}
export interface IEventData {
  [key: string]: IEvent[];
}

export const eventData: IEventData = {
  "January 2024": [
    { title: "New Year Celebration", date: "Jan 01", time: "10am-12pm" },
    { title: "Pet Appreciation Night", date: "Jan 12", time: "5-7pm" },
    { title: "Winter Photography Session", date: "Jan 15", time: "2-4pm" },
    { title: "Vaccine Clinic", date: "Jan 22", time: "9-11am" },
  ],
  "February 2024": [
    { title: "Groundhog Day Gathering", date: "Feb 02", time: "1-3pm" },
    { title: "Valentine's Day Party", date: "Feb 14", time: "7-9pm" },
    { title: "Pet Dental Health Seminar", date: "Feb 20", time: "6-8pm" },
  ],
  "March 2024": [
    { title: "Spring Break Kids & Pets Day", date: "Mar 07", time: "12-4pm" },
    { title: "St. Patrick's Day Parade", date: "Mar 17", time: "10am-12pm" },
    { title: "Beginner Pet Training Sessions", date: "Mar 24", time: "5-7pm" },
  ],
  "April 2024": [
    { title: "Spring Break Kids & Pets Day", date: "Mar 07", time: "12-4pm" },
    { title: "St. Patrick's Day Parade", date: "Mar 17", time: "10am-12pm" },
    { title: "Beginner Pet Training Sessions", date: "Mar 24", time: "5-7pm" },
  ],
  "May 2024": [
    { title: "Cinco de Mayo Fiesta", date: "May 05", time: "12-3pm" },
    { title: "Mother's Day Tea Party", date: "May 12", time: "1-3pm" },
    { title: "Memorial Day Parade", date: "May 27", time: "9-11am" },
    { title: "Spring Craft Fair", date: "May 07", time: "10am-5pm" },
    { title: "Community Garage Sale", date: "May 14", time: "8am-2pm" },
    { title: "Local Author Book Signing", date: "May 16", time: "3-5pm" },
    { title: "Pet Adoption Weekend", date: "May 20", time: "9am-4pm" },
    { title: "Historical Society Lecture", date: "May 22", time: "6-8pm" },
    { title: "Amateur Astronomy Night", date: "May 29", time: "8pm-10pm" },
  ],
  "June 2024": [
    { title: "Summer Kickoff BBQ", date: "Jun 01", time: "5-8pm" },
    { title: "Father's Day Fishing Derby", date: "Jun 16", time: "7-10am" },
    {
      title: "Juneteenth Freedom Day Celebration",
      date: "Jun 19",
      time: "2-5pm",
    },
  ],
  "July 2024": [
    { title: "Independence Day Fireworks", date: "Jul 04", time: "9-11pm" },
    { title: "Midsummer Night's Dream Party", date: "Jul 15", time: "7-10pm" },
    { title: "Dog Days of Summer Pool Party", date: "Jul 30", time: "3-6pm" },
  ],
  "August 2024": [
    {
      title: "International Cat Day Celebration",
      date: "Aug 08",
      time: "12-3pm",
    },
    { title: "Summer Camp Out", date: "Aug 22", time: "Overnight" },
    { title: "Back to School Bash", date: "Aug 31", time: "1-4pm" },
  ],
  "September 2024": [
    { title: "Labor Day Picnic", date: "Sep 01", time: "12-3pm" },
    { title: "Autumn Equinox Festival", date: "Sep 22", time: "10am-1pm" },
    { title: "Senior Pet Day", date: "Sep 29", time: "10am-12pm" },
  ],
  "October 2024": [
    { title: "Halloween Costume Parade", date: "Oct 31", time: "5-7pm" },
    { title: "Oktoberfest Celebration", date: "Oct 19", time: "2-5pm" },
    {
      title: "Fall Foliage Photography Walk",
      date: "Oct 13",
      time: "10am-12pm",
    },
  ],
  "November 2024": [
    { title: "Thanksgiving Charity Run", date: "Nov 24", time: "8-10am" },
    { title: "Veterans Day Salute", date: "Nov 11", time: "11am-1pm" },
    { title: "National Pet Awareness Day", date: "Nov 18", time: "9-11am" },
  ],
  "December 2024": [
    { title: "Christmas Market", date: "Dec 05", time: "10am-5pm" },
    { title: "New Year's Eve Gala", date: "Dec 31", time: "8pm-Midnight" },
    { title: "Winter Wonderland Walk", date: "Dec 18", time: "3-5pm" },
  ],
};
