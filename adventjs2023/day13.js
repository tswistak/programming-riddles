function calculateTime(deliveries) {
  let secondsDeliveries = 0;
  for (const delivery of deliveries) {
    const [h, m, s] = delivery.split(":").map((x) => parseInt(x));
    secondsDeliveries += h * 3600 + m * 60 + s;
  }
  const remainingTime = 7 * 3600 - secondsDeliveries;
  const sign = remainingTime <= 0 ? "" : "-";
  const absRemaining = Math.abs(remainingTime);
  const seconds = absRemaining % 60;
  const minutes = ((absRemaining - seconds) % 3600) / 60;
  const hours = Math.trunc(absRemaining / 3600);

  return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
}

// alternative
function calculateTime(deliveries) {
  const secondsInHour = 3600;
  const totalWorkingSeconds = 7 * secondsInHour;
  const totalDeliverySeconds = deliveries.reduce((acc, time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return acc + hours * secondsInHour + minutes * 60 + seconds;
  }, 0);
  const remainingSeconds = totalWorkingSeconds - totalDeliverySeconds;
  const sign = remainingSeconds > 0 ? "-" : "";
  const absRemainingSeconds = Math.abs(remainingSeconds);
  const hours = Math.floor(absRemainingSeconds / secondsInHour);
  const minutes = Math.floor((absRemainingSeconds % secondsInHour) / 60);
  const seconds = absRemainingSeconds % 60;
  return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
}

calculateTime(["00:10:00", "01:00:00", "03:30:00"]);
// '-02:20:00'

calculateTime(["02:00:00", "05:00:00", "00:30:00"]);
// '00:30:00'

calculateTime(["00:45:00", "00:45:00", "00:00:30", "00:00:30"]); // '-05:29:00'
