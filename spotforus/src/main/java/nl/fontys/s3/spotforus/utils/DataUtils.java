package nl.fontys.s3.spotforus.utils;

import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.Date;

@NoArgsConstructor
public class DataUtils {
    public Date[] getDaysInWeek(int year, int week) {
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.WEEK_OF_YEAR, week);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());

        Date[] days = new Date[7];
        for (int i = 0; i < 7; i++) {
            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MINUTE, 59);
            calendar.set(Calendar.SECOND, 59);
            days[i] = calendar.getTime();
            calendar.add(Calendar.DATE, 1);
        }
        return days;
    }
}
