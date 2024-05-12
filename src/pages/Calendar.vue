<template>
  <div class="p-10">
    <!-- <div class="demo-app-sidebar">
        <div class="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div class="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              :checked="calendarOptions.weekends"
              @change="handleWeekendsToggle"
            />
            toggle weekends
          </label>
        </div>
        <div class="demo-app-sidebar-section">
          <h2>All Events ({{ currentEvents.length }})</h2>
          <ul>
            <li v-for="event in currentEvents" :key="event.id">
              <b>{{ event.startStr }}</b>
              <i>{{ event.title }}</i>
            </li>
          </ul>
        </div>
      </div> -->
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <!-- <b>{{ arg.timeText }}</b> -->
          <label for="bookingPreviewModal" class="w-full cursor-pointer">
            <div
              class="bg-main-white w-full text-green-700 py-1 px-2 rounded text-xs border-none outline-none relative z-0"
            >
              {{ handleEventColor(arg.event) }}
              <span
                v-if="
                  arg.event?.extendedProps?.business?.category === 'Restaurant'
                "
                >{{ arg.event?.extendedProps?.business?.name }}</span
              >
              <span v-else></span>
              {{ arg.event?.extendedProps?.service?.service_name }}
            </div>
          </label>
        </template>
      </FullCalendar>
    </div>
    <BookingPreviewModal
      :item="modalItem"
      :setModal="setModal"
      :type="activeTab"
      :hanldeItem="handleRatingItem"
    />
    <BookingModal
      :title="modalContent.title"
      :description="modalContent.description"
      :handler="handleModal"
      :cancelation_fee="cancelation_fee"
    ></BookingModal>
    <RatingModal :item="ratingItem"></RatingModal>
  </div>
</template>

<script>
import BookingModal from "@/components/modals/BookingModal.vue";
import RatingModal from "@/components/modals/RatingModal.vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/vue3";
import { car } from "../assets/getAssets";
import BookingPreviewModal from "../components/modals/BookingPreviewModal.vue";
import { INITIAL_EVENTS, createEventId } from "../util/event-utils";

export default {
  components: {
    FullCalendar,
    BookingPreviewModal,
    BookingModal,
    RatingModal,
  },

  data: function () {
    return {
      car,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,title,next",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS,
        editable: true,
        // selectable: true,
        // selectMirror: true,
        // dayMaxEvents: true,
        weekends: true,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      currentEvents: [],
      cancelation_fee: "",
      modalContent: {
        title: "",
        description: "",
      },
      activeTab: "upcoming",
      modalFor: "",
      modalItem: {},
      ratingItem: {},
    };
  },

  watch: {
    
  },

  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },
    eventDidMount(info) {
      info.event.setStart(new Date(Number(info.event.extendedProps.timestamp)));
    },
    handleDateSelect(selectInfo) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },

    handleEventClick(info) {
      this.modalItem = info.event?._def.extendedProps;
    },
    handleModal() {
      if (this.modalFor === "cancel") {
        const payment = this.modalItem?.service?.payment_method?.toLowerCase();

        let amount = 0;
        if (this.activeTab != "waitlist") {
          let cancelation_fee = Number(
            this.modalItem?.service?.cancelation_fee || 0
          );
          if (payment === "deposit") {
            let deposite = Number(this.modalItem?.deposite || 0);
            amount = (deposite - cancelation_fee) * 100;
          } else if (payment === "pre payment") {
            let cost = Number(this.modalItem?.totalAmount || 0);
            amount = (cost - cancelation_fee) * 100;
          }
        }

        const data = {
          user_id: this.modalItem?.user_id,
          booking_id: this.modalItem?.booking_id,
          refund_amount: `${amount}`,
          type: this.activeTab,
          business_id: this.modalItem.business_id,
          section_type: "user",
        };
        // if payment type === 'pay in person then remove refound amount'
        this.cancelBooking(data);
      } else if (this.modalFor === "re-schedule") {
        this.setSelectedBooking({
          ...this.modalItem,
          activeTab: this.activeTab,
        });
        if (this.activeTab === "waitlist") {
          this.$router.push({ name: "waitlist-reschedule" });
        } else {
          this.$router.push({ name: "update-booking" });
        }
      }
    },
    setModal(value, item) {
      this.modalFor = value;
      this.modalItem = item;
      const newObj = {
        ...this.modalItem,
        modalFor: value,
      };
      this.modalItem = { ...newObj };
      const payment = item?.service?.payment_method?.toLowerCase();
      if (
        this.activeTab != "waitlist" &&
        (payment === "deposit" || payment === "pre payment")
      ) {
        let cancelation_fee = item?.service?.cancelation_fee;
        if (cancelation_fee != 0) {
          this.cancelation_fee = cancelation_fee;
        } else {
          this.cancelation_fee = "";
        }
      }

      if (value === "cancel") {
        this.modalContent.title = "Are you sure to cancel?";
        this.modalContent.description =
          "Make sure you are aware of the action. After the cancellation you cannot go back to regular order.";
      } else if (value === "re-schedule") {
        this.modalContent.title = "Are you sure to re-schedule?";
        this.modalContent.description =
          "Make sure you are aware of the action. Re-scheduling is considered as a bad practice with your potential customer. In future, they might have option to reject re-scheduling.";
      }
    },
    handleRatingItem(item) {
      this.ratingItem = item;
    },
    handleEventColor(date) {},
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>

<style lang="css">
.fc-h-event {
  border: none;
  background-color: transparent;
}

.fc-toolbar-chunk div {
  display: flex;
  align-items: center;
  gap: 24px;
}

.fc-prev-button,
.fc-next-button {
  width: 32px;
  height: 32px;
  padding: 0 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5 !important;
  border: none !important;
  outline: none;
  box-shadow: none !important;
}

.fc .fc-button .fc-icon {
  font-size: 1.2rem;
  color: #757575;
}

.fc-button-group {
  gap: 0 !important;
}

.fc-toolbar-title {
  font-size: 14px !important;
  color: #212121;
}

.fc-dayGridMonth-button,
.fc-timeGridWeek-button,
.fc-timeGridDay-button {
  background-color: #f5f5f5 !important;
  border: none !important;
  border-right: 1px solid #d6d6d6 !important;
  outline: none;
  color: #757575 !important;
  text-transform: capitalize !important;
  border-radius: 0 !important;
  margin: 0 !important;
  box-shadow: none !important;
  transition: all 0.3s ease-in-out;
}

.fc-button-active {
  background-color: #1ec96b !important;
  border-color: #1ec96b !important;
  color: #fff !important;
}

.fc-timeGridDay-button {
  border-right: none !important;
}

.fc-dayGridMonth-button {
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
}

.fc-timeGridDay-button {
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
}

.fc-scrollgrid-sync-inner {
  font-size: 12px;
  color: #808080;
  font-weight: 400;
  padding: 16px 0;
}

.fc-daygrid-dot-event:hover {
  background-color: transparent;
}
</style>
