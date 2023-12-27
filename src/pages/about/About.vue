<template>
  <div>about me</div>
</template>

<script>
export default {
  data() {
    return {
      selecteDate: "1703653833", // all or unix date value 1703737833
      data: [
        {
          timestamp: "1703689533", // Wed Dec 27 2023 16:00:33 GMT+0600 (Bangladesh Standard Time)
          date: "1703692833", // Wed Dec 27 2023 22:00:33 GMT+0600 (Bangladesh Standard Time)
          name: "hello World",
        },
        {
          timestamp: "1703809833", // Fri Dec 29 2023 08:30:33 GMT+0600 (Bangladesh Standard Time)
          date: "1703737833", // Fri Dec 29 2023 06:30:33 GMT+0600 (Bangladesh Standard Time)
          name: "hello Earth",
        },
        {
          timestamp: "1703385933", // Sun Dec 24 2023 08:45:33 GMT+0600 (Bangladesh Standard Time)
          date: "1703378733", // Sun Dec 24 2023 06:45:33 GMT+0600 (Bangladesh Standard Time)
          name: "hello Universe",
        },
      ],
    };
  },
  mounted() {
    const test = this.filterData();
    const dates = this.mergeData();
    console.log(dates);
  },
  methods: {
    filterData() {
      const currentDate = new Date().getTime() / 1000; // current date in Unix timestamp format

      return this.data.filter((item) => {
        const itemDate = parseInt(item.date);
        const itemTimestamp = parseInt(item.timestamp);

        if (this.selecteDate === "all") {
          const currentDateStr = new Date(currentDate * 1000)
            .toISOString()
            .split("T")[0];
          const itemDateStr = new Date(itemDate * 1000)
            .toISOString()
            .split("T")[0];

          return (
            itemDateStr > currentDateStr ||
            (itemDateStr === currentDateStr && itemTimestamp >= currentDate)
          );
        } else {
          const selectedDate = parseInt(this.selecteDate);
          const selectedTimestamp = selectedDate + (currentDate % 86400); // Add current time to selected date

          const currentDateStr = new Date(currentDate * 1000)
            .toISOString()
            .split("T")[0];
          const selectedDateStr = new Date(selectedDate * 1000)
            .toISOString()
            .split("T")[0];
          const itemDateStr = new Date(itemDate * 1000)
            .toISOString()
            .split("T")[0];

          return (
            (selectedDateStr === currentDateStr &&
              itemTimestamp >= currentDate) ||
            (selectedDateStr === itemDateStr &&
              itemTimestamp >= selectedTimestamp)
          );
        }
      });
    },
    mergeData() {
      const dates = this.data.map((item) => {
        const date = new Date(parseInt(item.date) * 1000);
        const time = new Date(parseInt(item.timestamp) * 1000);
        const mergedTimestamp =
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes(),
            time.getSeconds()
          ).getTime() / 1000;
        return {
          ...item,
          mergedTimestamp: mergedTimestamp,
        };
      });
      return dates;
    },
  },
};
</script>

<!-- i have this type array now i want an array objects who are equal or greater than current date and time. if i want objects by fullfiled some condition.

      first: i want an function where first i want to check that my "selecteDate" is "all" or unix value. if it's all value then
      1 : then i have to check that my object "date" is equal or greater than from current date or not.
      2 : if object date is greater than current date then i do not want to check any thing just return
      3 : if object date is equal to current date then i wan to check that object "timestamp" is equal or greater than my current date time. like if my timestamp value is 16:45:33 and my current date time is 14:45:32 or my current date time is 16:45:33 . then i want return that object otherwise i do not want that value.
      
      second : it's an unix value then i want to check like this
      1 : then i have to check that "selecteDate" is equal current date or not.
      2 : if selecteDate is equal to current date then i wan to check that object "timestamp" is equal or greater than my current date time. like if my timestamp value is 16:45:33 and my current date time is 14:45:32 or my current date time is 16:45:33 . then i want return that object otherwise i do not want that value.
      3.  if it's not match then i want to check that that date is match any object 'date' or not if it's match then i return that object -->
