/**
 * @param {string} fromTime - The current time in elf format
 * @param {string} takeOffTime - The take off time in elf format
 * @returns {number} The time in seconds until take off
 */
function timeUntilTakeOff(fromTime, takeOffTime) {
  const [_, fromY, fromM, fromD, fromH, fromMm, fromS] = fromTime.match(
    /(\d\d\d\d)\*(\d\d)\*(\d\d)@(\d\d)\|(\d\d)\|(\d\d) NP/,
  );
  const [__, takeY, takeM, takeD, takeH, takeMm, takeS] = takeOffTime.match(
    /(\d\d\d\d)\*(\d\d)\*(\d\d)@(\d\d)\|(\d\d)\|(\d\d) NP/,
  );

  const fromDate = new Date(
    Date.UTC(fromY, fromM - 1, fromD, fromH, fromMm, fromS),
  );
  const takeDate = new Date(
    Date.UTC(takeY, takeM - 1, takeD, takeH, takeMm, takeS),
  );

  return (takeDate - fromDate) / 1000;
}

const takeoff = "2025*12*25@00|00|00 NP";

// from December 24, 2025, 23:59:30, 30 seconds before takeoff
timeUntilTakeOff("2025*12*24@23|59|30 NP", takeoff);
// 30

// exactly at takeoff time
timeUntilTakeOff("2025*12*25@00|00|00 NP", takeoff);
// 0

// 12 seconds after takeoff
timeUntilTakeOff("2025*12*25@00|00|12 NP", takeoff);
// -12
