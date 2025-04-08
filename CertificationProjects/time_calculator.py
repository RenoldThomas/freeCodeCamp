# Renold Thomas
# Time Calculator
# This function takes a start time, a duration, and an optional starting day of the week.
# It returns the new time after adding the duration to the start time,
# and indicates how many days later it is if applicable.

def add_time(start, duration, starting_day = None):
    start_time = start.split(' ') 
    time = [int(s) for s in start_time[0].split(':')]
    duration_time = [int(s) for s in duration.split(':')]
    new_time = []

    # Convert start hour to 24-hour format
    hour = time[0]
    if start_time[1] == 'PM' and hour != 12:
        hour += 12
    elif start_time[1] == 'AM' and hour == 12:
        hour = 0

    # Add duration
    total_minutes = time[1] + duration_time[1]
    extra_hour = total_minutes // 60
    final_minutes = total_minutes % 60

    total_hours = hour + duration_time[0] + extra_hour
    days_passed = total_hours // 24
    final_hour_24 = total_hours % 24

    # Convert back to 12-hour format and determine AM/PM
    if final_hour_24 == 0:
        final_hour = 12
        period = 'AM'
    elif final_hour_24 < 12:
        final_hour = final_hour_24
        period = 'AM'
    elif final_hour_24 == 12:
        final_hour = 12
        period = 'PM'
    else:
        final_hour = final_hour_24 - 12
        period = 'PM'

    new_time = str(final_hour) + ':' + str(final_minutes).zfill(2) + ' ' + period

    # Add day of the week if provided
    if starting_day:
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        day_index = days.index(starting_day.capitalize())
        new_day_index = (day_index + days_passed) % 7
        new_time += ', ' + days[new_day_index]

    # Add day information
    if days_passed == 1:
        new_time += ' (next day)'
    elif days_passed > 1:
        new_time += ' (' + str(days_passed) + ' days later)'

    return new_time


print(add_time("2:59 AM", "24:00"))
