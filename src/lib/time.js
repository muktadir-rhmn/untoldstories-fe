class Time {
    monthNameMap = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    epochToReadable(epoch) {
        const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
        date.setUTCSeconds(epoch);

        const day = date.getDate();
        const month = this.monthNameMap[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
}

const time = new Time();

export default time;