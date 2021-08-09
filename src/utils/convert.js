module.exports = {
    timeConverter: (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time =
            hour.toString().substr(-2) +
            ':' +
            min.toString().substr(-2) +
            ':' +
            sec.toString().substr(-2) +
            date +
            ' ' +
            month +
            ' ' +
            year;
        return time;
    },
};
