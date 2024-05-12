<template>
  <div>
    <div class="w-full max-w-[1176px] mx-auto flex justify-end">
      <dropdown classes="w-full min-w-min  drop-right z-50">
        <template v-slot:toggle>
          <button
            class="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M20.8333 3.6H19.6666V2.55C19.6666 1.9725 19.1416 1.5 18.5 1.5C17.8583 1.5 17.3333 1.9725 17.3333 2.55V3.6H7.99996V2.55C7.99996 1.9725 7.47496 1.5 6.83329 1.5C6.19163 1.5 5.66663 1.9725 5.66663 2.55V3.6H4.49996C3.20496 3.6 2.16663 4.545 2.16663 5.7V20.4C2.16663 21.555 3.20496 22.5 4.49996 22.5H20.8333C22.1166 22.5 23.1666 21.555 23.1666 20.4V5.7C23.1666 4.545 22.1166 3.6 20.8333 3.6ZM19.6666 20.4H5.66663C5.02496 20.4 4.49996 19.9275 4.49996 19.35V8.85H20.8333V19.35C20.8333 19.9275 20.3083 20.4 19.6666 20.4Z"
                fill="#EEAF31"
              />
              <path
                d="M12.6666 10.6875C10.4931 10.6875 8.72913 12.4515 8.72913 14.625C8.72913 16.7985 10.4931 18.5625 12.6666 18.5625C14.8401 18.5625 16.6041 16.7985 16.6041 14.625C16.6041 12.4515 14.8401 10.6875 12.6666 10.6875ZM14.6354 15.0188H13.0604V16.5938H12.2729V15.0188H10.6979V14.2313H12.2729V12.6562H13.0604V14.2313H14.6354V15.0188Z"
                fill="#EEAF31"
              />
            </svg>
          </button>
        </template>
        <template v-slot:menu>
          <div
            class="shadow bg-white text-black900 rounded w-max flex flex-col"
          >
            <add-to-calendar-button
              class="customBtn"
              :name="name"
              startDate="2024-05-03"
              options="'Apple'"
              hideIconList
              buttonsList
              hideBackground
              inline
              lightMode="bodyScheme"
              label="Add to Apple Calendar"
            ></add-to-calendar-button>
            <add-to-calendar-button
              class="customBtn"
              :name="name"
              startDate="2024-05-03"
              options="'Google'"
              hideIconList
              buttonsList
              hideBackground
              inline
              label="Add to Google Calendar"
              lightMode="bodyScheme"
            ></add-to-calendar-button>
            <add-to-calendar-button
              class="customBtn"
              :name="name"
              startDate="2024-05-03"
              options="'Apple'"
              hideIconList
              buttonsList
              hideBackground
              inline
              label="Add to Apple Calendar"
              lightMode="bodyScheme"
            ></add-to-calendar-button>
          </div>
        </template>
      </dropdown>
    </div>
  </div>
</template>

<script>
import "add-to-calendar-button";

export default {};
</script>

<style>
add-to-calendar-button.customBtn::part(atcb-button) {
  background-color: transparent;
  border: none;
  box-shadow: none;
  font-weight: 400;
}

.customBtn {
  width: 100%;
}

.customBtn:hover {
  background-color: #fafafa;
}
</style>
