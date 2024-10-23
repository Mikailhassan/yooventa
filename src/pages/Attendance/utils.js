export const isDateAvailable = (school, date) => {
    const checkDate = new Date(date);
    const dayOfWeek = checkDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Check if it's a school day
    if (!school.schedule.weekdays.includes(dayOfWeek)) {
        return false;
    }

    // Check for holidays
    const isHoliday = school.schedule.holidays.some(holiday => {
        const start = new Date(holiday.startDate);
        const end = new Date(holiday.endDate);

        switch (holiday.repeatType) {
            case 'yearly':
                return (
                    checkDate.getMonth() === start.getMonth() &&
                    checkDate.getDate() >= start.getDate() &&
                    checkDate.getDate() <= end.getDate()
                );
            case 'monthly':
                return checkDate.getDate() >= start.getDate() && checkDate.getDate() <= end.getDate();
            case 'none':
            default:
                return checkDate >= start && checkDate <= end;
        }
    });

    return !isHoliday;
};

export const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};