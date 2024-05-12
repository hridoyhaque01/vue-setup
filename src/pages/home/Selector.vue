<template>
  <section class="h-screen flex items-center justify-center">
    <div class="w-full max-w-sm">
      <vSelect
        label="time"
        :options="slots"
        v-model="slot"
        @input="findSlot"
        placeholder="Slot"
      />
    </div>
  </section>
</template>

<script>
import vSelect from "vue-select";
import Select from "./components/shared/Select.vue";

export default {
  components: {
    Select,
    vSelect,
  },
  data() {
    return {
      slot: "",
      slots: [
        { unix: 1713873600000, isAvilable: true, time: "6:00 PM" },
        { unix: 1713876000000, isAvilable: true, time: "6:40 PM" },
        { unix: 1713878400000, isAvilable: true, time: "7:20 PM" },
        { unix: 1713880800000, isAvilable: true, time: "8:00 PM" },
        { unix: 1713883200000, isAvilable: true, time: "8:40 PM" },
        { unix: 1713885600000, isAvilable: false, time: "9:20 PM" },
        { unix: 1713888000000, isAvilable: true, time: "10:00 PM" },
        { unix: 1713890400000, isAvilable: true, time: "10:40 PM" },
        { unix: 1713892800000, isAvilable: true, time: "11:20 PM" },
      ],
      selectedTime: "",
    };
  },
  methods: {
    handleTimeChange(value) {
      this.selectedTime = value;
    },
    findSlot(event) {
      const value = event.target.value;
      if (!this.slot?.unix || !this.slot.isSelected) {
        this.slot = {
          unix: 1713892800000,
          isAvilable: true,
          time: value,
          isSelected: false,
        };
      } else {
        this.slot = {
          ...this.slot,
          isSelected: true,
        };
      }
    },
  },
};
</script>

<style>
.vs__actions {
  display: none !important;
}

.vs__dropdown-toggle {
  padding: 16px !important;
  border-color: #e0e0e0 !important;
  border-radius: 8px !important;
}

.vs__selected,
.vs__search {
  margin: 0 !important;
  border: none !important;
  padding: 0 !important;
}

.vs__search::placeholder {
  color: #d0d0d0 !important;
}

@media only screen and (max-width: 767px) {
  .vs__dropdown-toggle {
    padding: 10px 12px !important;
  }
}
</style>
