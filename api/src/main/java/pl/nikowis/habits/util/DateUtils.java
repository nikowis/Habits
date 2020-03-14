package pl.nikowis.habits.util;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DateUtils {

    public static Date getTodayDayEnd() {
        return Date.from(LocalDate.now().atStartOfDay().plusDays(1).atZone(ZoneId.systemDefault()).toInstant());
    }

    public static Date getTodayDayStart() {
        return Date.from(LocalDate.now().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
    }
}
