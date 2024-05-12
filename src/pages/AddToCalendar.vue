<template>
  <div>
    <a :href="calendarFileUrl" download="calendar_events.ics"
      >Download Calendar Events</a
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      calendarFileUrl: "",
    };
  },
  mounted() {
    this.generateAndSetCalendarFileUrl();
  },
  methods: {
    generateAndSetCalendarFileUrl() {
      const calendarEvents = this.generateCalendarEvents();
      const calendarData = this.generateICSFile(calendarEvents);
      const blob = new Blob([calendarData], {
        type: "text/calendar;charset=utf-8",
      });
      this.calendarFileUrl = URL.createObjectURL(blob);
    },
    // generateCalendarEvents and generateICSFile methods as before
  },
  beforeDestroy() {
    URL.revokeObjectURL(this.calendarFileUrl);
  },
};
</script>
