package pl.nikowis.habits.util;

import org.joda.time.DateTime;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DateUtils {

    public static Date getTodayDayEnd() {
        return DateTime.now().withTimeAtStartOfDay().plusDays(1).toDate();
    }

    public static Date getTodayDayStart() {
        return DateTime.now().withTimeAtStartOfDay().toDate();
    }

    public static Date getNowMinusDays(int days) {
        return DateTime.now().minusDays(days).toDate();
    }
}
