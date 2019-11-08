function fmt00(i) { if (i < 10) return "0" + i; else return i; }
function start() {
    var clock = document.getElementById("clock");
    function updateClock(now = new Date()) {
        clock.innerHTML = fmt00(now.getHours()) + ":" + fmt00(now.getMinutes());
    }
    updateClock();
    setInterval(updateClock, 500);
}