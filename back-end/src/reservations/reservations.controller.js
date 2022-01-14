const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

function validateData(req, res, next) {
  if (!req.body.data) {
    return next({
      status: 400,
      message: 'There is literally no data'
    })
  }
}

// join together maybe?

function hasFirstName(req, res, next) {
  const name = req.body.data.first_name;
  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "first_name property is required.",
  })
}


function hasLastName(req, res, next) {
  const name = req.body.data.last_name;
  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "last_name property is required.",
  })
}




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

// something like this lmao 

// function hasReservationTime(req, res, next) {
//   const time = req.body.data.reservation_time;
//   // const date = req.body.data.reservation_date;
//   if (time && typeof time === 'string') {
//     return next();
//   }
//   next({
//     status: 400,
//     message: 'Valid reservation time is required.'
//   })
// }



async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}


function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
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


async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const updatedReservation = {
    ...req.body.data,
    reservation_id,
  };
  const updated = await service.update(updatedReservation);
  res.json({ data: updated[0] })
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

function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatus = ['booked', 'seated', 'finished', 'cancelled'];
  if (!validStatus.includes(status)) {
    return next({
      status: 400,
      message: `Status ${status} is not valid.`,
    });
  }
  next();
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredFields,
    hasFirstName,
    hasLastName,
    people,
    validateData,
    // hasReservationTime,
    hasValidStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    hasRequiredFields,
    hasValidStatus,
    hasFirstName,
    hasLastName,
    // hasReservationTime,
    people,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    hasRequiredFields,
    asyncErrorBoundary(reservationExists),
    hasValidStatus,
    asyncErrorBoundary(updateStatus),
  ],
};
