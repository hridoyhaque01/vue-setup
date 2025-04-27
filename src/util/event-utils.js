let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, "");

// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: "Event 1",
//     start: "2024-04-29",
//   },
//   {
//     id: createEventId(),
//     title: "Event 2",
//     start: "2024-04-23T11:50:57+00:00",
//   },
//   {
//     id: createEventId(),
//     title: "Event 3",
//     start: "2024-04-23T11:50:57.000000Z",
//   },
// ];

export const INITIAL_EVENTS = [
  {
    id: 3,
    booking_id: "1713873057505",
    staff_id: "1713872435340",
    service_id: "1713872824321",
    business_id: "bui1713869759137",
    user_id: "1713872894166",
    date: "1713873024312",
    time: "1713873000000",
    remind_before: "15",
    additional_answer: "[]",
    date_time_slug: "Apr-23-24-1713873000000",
    note: "fgghgghgh",
    deposite: "50",
    totalAmount: "598",
    timestamp: "1713873000000",
    start: "2024-04-23T11:50:57+00:00",
    created_at: "2024-04-23T11:50:57.000000Z",
    updated_at: "2024-04-23T11:50:57.000000Z",
    userDetails: {
      name: "Hridoy Haque",
      phone: "012-441-2412",
      email: "hridoyhaque.info@gmail.com",
    },
    staff: {
      staff_name: "Black Adam",
      image:
        "https://server.kangabooking.com/../storage/staff_images/staff_1713872435.jpg",
    },
    business: {
      name: "Paramount Astronaut",
      address: "Chuadanga",
      phone: "01861883575",
      email: "amhredhay102@gmail.com",
      user_id: "1713869759137",
      business_id: "bui1713869759137",
      category: "Travel",
    },
    service: {
      service_name: "Astronaut 03",
      payment_method: "Deposit",
      cancelation_fee: "18",
      deposite: "50",
      image: [
        "https://server.kangabooking.com/../storage/service_images/service_1713872824_66279fb84e646.jpg",
        "https://server.kangabooking.com/../storage/service_images/service_1713872824_66279fb8535bf.jpg",
        "https://server.kangabooking.com/../storage/service_images/service_1713872824_66279fb855605.jpg",
        "https://server.kangabooking.com/../storage/service_images/service_1713872824_66279fb85842f.jpg",
        "https://server.kangabooking.com/../storage/service_images/service_1713872824_66279fb85a5cd.jpg",
        "https://server.kangabooking.com/../storage/service_images/service_1713872824_66279fb85b8e3.jpg",
        "https://server.kangabooking.com/../storage/service_images/service_1713872824_66279fb85cb3d.jpg",
      ],
      rating: 0,
      duration: "01:00",
    },
    questionAnswer: [],
  },
  {
    id: 13,
    booking_id: "1713935775453",
    staff_id: "18",
    service_id: "N/A",
    business_id: "bui1713873526002",
    user_id: "1713872894166",
    date: "1713895200000",
    time: "1713852900000",
    remind_before: "15",
    additional_answer: "[]",
    date_time_slug: "Apr-24-24-1713852900000",
    note: "hello",
    deposite: "0",
    totalAmount: "0",
    timestamp: "1713939300000",
    start: "2024-04-29",
    created_at: "2024-04-24T05:16:15.000000Z",
    updated_at: "2024-04-24T05:24:58.000000Z",
    userDetails: {
      name: "Hridoy Haque",
      phone: "012-441-2412",
      email: "hridoyhaque.info@gmail.com",
    },
    business: {
      name: "Vive",
      address: "Dhaka",
      phone: "01861883575",
      email: "vive@g.co",
      user_id: "1713873526002",
      business_id: "bui1713873526002",
      category: "Restaurant",
      thumbnail:
        "https://server.kangabooking.com/../storage/business_profile_images/thumbnail_1713873857.jpg",
    },
    service: {
      rating: 0,
    },
  },
];

export function createEventId() {
  return String(eventGuid++);
}
