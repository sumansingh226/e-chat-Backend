import cron, { ScheduledTask } from 'node-cron';

let scheduledTask: ScheduledTask;

export function scheduleWeeklyJob() {
    scheduledTask = cron.schedule('0 10 * * 1', () => {
        console.log('This job runs every week on Monday at 10:00 AM');
        stopScheduledJob()
    });

    // Start the job
    scheduledTask.start();
}


export function stopScheduledJob() {
    if (scheduledTask) {
        scheduledTask.stop();
    }
}


export function scheduleMonthlyJob() {
    scheduledTask = cron.schedule('0 10 1 * *', () => {
        console.log('This job runs on the first day of every month at 10:00 AM');
    });

    scheduledTask.start();
}
