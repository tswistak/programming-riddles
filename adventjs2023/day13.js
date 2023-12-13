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

calculateTime(["00:10:00", "01:00:00", "03:30:00"]);
// '-02:20:00'

calculateTime(["02:00:00", "05:00:00", "00:30:00"]);
// '00:30:00'

calculateTime(["00:45:00", "00:45:00", "00:00:30", "00:00:30"]); // '-05:29:00'
