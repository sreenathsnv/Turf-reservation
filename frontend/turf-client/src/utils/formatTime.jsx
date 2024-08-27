export function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const diff = now - date;

    // Calculate the difference in seconds, minutes, hours, and days
    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Return the appropriate string
    if (diffInDays > 0) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
        return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
    }
}

export function convertTimeToHHMM(time) {
    // Check if the input is in the correct format (HH:MM:SS)
    if (time.length === 8 && time[2] === ':' && time[5] === ':') {
        return time.slice(0, 5); // Extracts and returns HH:MM
    }
}