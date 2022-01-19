const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

/**
 * 
 * List handler for reservation resources
 */
// reservations for a given date with or without phone number

async function list(req, res) {
  const { date, mobile_number } = req.query;

  if (date) {
    res.json({ data: await service.listByDate(date) });
  } else if (mobile_number) {
    res.json({ data: await service.search(mobile_number) });
  } else {
    res.json({ data: await service.list() });
  }
}

function noPastReservations(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const now = Date.now();
  const currentReservation = new Date(`${reservation_date} ${reservation_time}`).valueOf();

  if (currentReservation > now) {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must be in future.",
  })
}

// function validateData(req, res, next) {
//   if (!req.body.data) {
//     return next({
//       status: 400,
//       message: 'There is literally no data'
//     })
//   }
//   next();
// }



//     //TODO
//     // if first_name/last_name/mobilePhone/reservation_date/reservation_time/people are missing
//     // if first_name/last_name/mobilePhone/reservation_date/reservation_time
//     //if people is NAN, is zero
//     // if reservation_date is not a date
//     // if reservation_time is not a time
//     // if data is valid 
//     // returns only reservations matching date query parameter
//     // returns reservations sorted by time (earliest time first)
//   }
// }

// validate reservation is in the future, on a day the restaurant is open, and or during restaurants open hours

function people(req, res, next) {
  const { people } = req.body.data;
  if (Number(people) <= 0 || !Number(people) || typeof people !== 'number') {
    return next({
      status: 400,
      message: 'Number of people added is an invalid number.'
    });
  }
  next();
}




async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}



function read(req, res) {
  const data = res.locals.reservation;
  res.json(data);
}


async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} can't be found.`,
  });
}

const requiredFields = [
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
];

function hasRequiredFields(req, res, next) {
  const { data = {} } = req.body;
  res.locals.reservation = req.body.data;
  const invalidFields = Object.keys(data).filter((field) => {
    !requiredFields.includes(field);
  });
  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(',')}`
    })
  next();
}

const hasRequiredProperties = hasProperties("first_name", "last_name");


async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const updatedReservation = {
    ...req.body.data,
    reservation_id,
  };
  const updated = await service.update(updatedReservation);
  res.json({ data: updated[0] })
}

function hasMobileNumber(req, res, next) {
  const number = req.body.data.mobile_number;
  if (number && typeof number === 'string') {
    return next();
  }
  next({
    status: 400,
    message: "valid mobile_number property required.",
  })
}

// let time = req.body.data.reservation_time;
//   // let validTime = time.split(":")
//   if(!time) {
//     return next({
//       status: 400,
//       message: `reservation_time`
//     })
//   }
//   next();
// }

function hasReservationTime(req, res, next) {
  let time = req.body.data.reservation_time;

  const validTimeFormat = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

  if (!time) {
    next({
      status: 400,
      message: `reservation_time cannot be empty. Please select a time.`,
    });
  }

  if (!time.match(validTimeFormat)) {
    return next({
      status: 400,
      message: `The reservation_time must be a valid time in the format '12:30`,
    });
  }
  next();
}


function hasReservationDate(req, res, next) {
  let date = req.body.data.reservation_date;
  const isDate = (value) => {
    return (new Date(value) !== "invalid Date" && !isNaN(new Date(value)))
  }
  if (date && typeof date === 'string' && isDate(date)) {
    return next();
  }
  next({
    status: 400,
    message: "valid reservation_date property required.",
  })
}

async function updateStatus(req, res) {
  const { reservation_id } = req.params;
  const updatedReservation = {
    ...req.body.data,
    reservation_id,
  };
  const updated = await service.updateStatus(updatedReservation);
  res.json({ data: updated[0] })
}

// function hasValidStatus(req, res, next) {
//   const { status } = req.body.data;
//   const validStatus = ['booked', 'seated', 'finished', 'cancelled'];
//   if (!validStatus.includes(status)) {
//     return next({
//       status: 400,
//       message: `Status ${status} is not valid.`,
//     });
//   }
//   next();
// }

// function hasValidStatus(req, res, next) {
//   const { status } = req.body.data;
//   const validStatus = ['booked', 'seated', 'finished', 'cancelled'];
//   if (!validStatus.includes(status)) {
//     return next({
//       status: 400,
//       message: `Status ${status} is not valid.`,
//     });
//   }
//   next();
// }


function noTuesday(req, res, next) {
  const date = req.body.data.reservation_date;
  const weekday = new Date(date).getUTCDay();
  if (weekday !== 2) {
    return next();
  }
  next({
    status: 400,
    message: "Restaurant is closed on Tuesdays.",
  })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredFields,
    hasRequiredProperties,
    hasMobileNumber,
    people,
    noTuesday,
    noPastReservations,
    // validateData,
    hasReservationTime,
    hasReservationDate,
    // hasValidStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    hasRequiredFields,
    hasRequiredProperties,
    noTuesday,
    noPastReservations,
    // hasValidStatus,
    hasReservationTime,
    hasReservationDate,
    hasMobileNumber,
    people,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    hasRequiredFields,
    asyncErrorBoundary(reservationExists),
    // hasValidStatus,
    asyncErrorBoundary(updateStatus),
  ],
};