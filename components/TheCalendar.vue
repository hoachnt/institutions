<template>
  <ClientOnly placeholder="loading...">
    <transition name="fade">
      <FullCalendar v-bind:options="options" />
    </transition>
  </ClientOnly>
</template>
<script setup>
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const id = ref(0);
const store = usePiniaStore();
const options = reactive({
  plugins: [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev, next today",
    center: "title",
    right: "dayGridMonth, dayGridWeek",
  },
  editable: true,
  selectable: true,
  weekends: true,
  select: (arg) => {
    console.log(arg);
    id.value = id.value + 1;

    const cal = arg.view.calendar;
    cal.unselect();
    cal.addEvent({
      id: `${id.value}`,
      title: `New event ${id.value}`,
      start: arg.start,
      end: arg.end,
      allDay: true,
    });
  },
});

options.events = computed(() => {
  return store.schedules;
});
</script>
<style>
table {
  border-radius: 1.5em;
  overflow: hidden;
  background: #fff;
}
button.fc--button.fc-button.fc-button-primary {
  display: none;
}
button.fc-dayGridWeek-button.fc-button.fc-button-primary {
  margin-left: 0;
}
button.fc-next-button.fc-button.fc-button-primary {
  margin: 0;
}
button.fc-next-button.fc-button.fc-button-primary > span {
  display: flex;
  justify-content: center;
  align-items: center;
}
button.fc-prev-button.fc-button.fc-button-primary > span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr {
  margin-bottom: 8px;
}
th {
  background: #2a2828 !important;
  color: #fff;
}
@media only screen and (max-width: 600px) {
  .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr {
    display: flex;
    flex-direction: column;
  }
  .fc-toolbar-chunk {
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }
  .fc-today-button.fc-button.fc-button-primary {
    margin: 0;
  }
  .fc-next-button.fc-button.fc-button-primary,
  .fc-prev-button.fc-button.fc-button-primary {
    display: flex;
    justify-content: center;
  }
}
</style>