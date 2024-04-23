import cron, { ScheduledTask } from 'node-cron';

interface Notification {
    date: string; // Date format: 'YYYY-MM-DD'
    time: string; // Time format: 'HH:MM'
    message: string;
}

function scheduleOneTimeNotification(notification: Notification): ScheduledTask | null {
    // Parse the date and time
    const [year, month, day] = notification.date.split('-').map(Number);
    const [hour, minute] = notification.time.split(':').map(Number);

    // Get the current date and time
    const now = new Date();
    const scheduledDateTime = new Date(year, month - 1, day, hour, minute);

    // Ensure that the scheduled date and time are in the future
    if (scheduledDateTime <= now) {
        console.error('Scheduled date and time must be in the future.');
        return null;
    }

    // Schedule the cron job
    const job = cron.schedule(`${minute} ${hour} ${day} ${month} *`, () => {
        console.log(notification.message);
        job.stop(); // Cancel the cron job after it has run
    });

    return job;
}

// Example usage
const notification: Notification = {
    date: '2024-04-24',
    time: '16:00',
    message: 'Sending one-time notification!'
};

const scheduledJob = scheduleOneTimeNotification(notification);
if (scheduledJob) {
    console.log('Notification scheduled successfully.');
} else {
    console.error('Failed to schedule notification.');
}
