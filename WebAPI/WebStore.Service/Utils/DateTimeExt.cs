using System;
using System.Collections.Generic;
using System.Text;

namespace WebStore.Service.Utils
{
    static class DateTimeExt
    {
        //To Get The First Day of the Week in C#
        public static DateTime GetFirstDayOfWeek(this DateTime date)
        {
            var culture = System.Threading.Thread.CurrentThread.CurrentCulture;
            var diff = date.DayOfWeek - culture.DateTimeFormat.FirstDayOfWeek;
            if (diff < 0)
                diff += 7;
            return date.AddDays(-diff).Date;
        }

        //To Get The Last Day of the Week in C#
        public static DateTime GetLasttDayOfWeek(this DateTime date)
        {
            var culture = System.Threading.Thread.CurrentThread.CurrentCulture;
            var diff = date.DayOfWeek - culture.DateTimeFormat.FirstDayOfWeek;
            if (diff < 0)
                diff += 7;
            DateTime start = date.AddDays(-diff).Date;
            return start.AddDays(6).Date;
        }
    }
}
