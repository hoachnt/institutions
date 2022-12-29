<template>
  <ClientOnly placeholder="loading...">
    <transition name="page">
      <FullCalendar
        v-bind:options="options"
        class="min-w-full bg-primary"
        :key="componentKey"
      />
    </transition>
    <TheItemDialog />
  </ClientOnly>
</template>
<script setup lang="ts">
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { Interface } from "readline";

interface INewEvent {
  location_id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}
interface IEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

const token = useDirectusToken();
const store = usePiniaStore();
const newEvent: INewEvent = reactive({
  location_id: "",
  title: "",
  start: new Date(),
  end: new Date(),
  allDay: false,
});
const componentKey = ref(0);

function forceRerender() {
  componentKey.value += 1;
}
const createEvent = async (event: IEvent) => {
  newEvent.location_id = event.id;
  newEvent.title = event.title;
  newEvent.start = event.start.setDate(event.start.getDate() + 1);
  newEvent.end = event.end.setDate(event.end.getDate() + 1);
  newEvent.allDay = event.allDay;

  try {
    await $fetch(`${store.url}/items/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: newEvent,
    });
    await store.fetchSchedule();
    await forceRerender();
  } catch (error) {
    alert(error);
  }
};
const updateEvent = async (event: IEvent, id: string) => {
  newEvent.location_id = event.id;
  newEvent.title = event.title;
  newEvent.start = event.start.setDate(event.start.getDate() + 1);
  newEvent.end = event.end.setDate(event.end.getDate() + 1);
  newEvent.allDay = event.allDay;

  try {
    await $fetch(`${store.url}/items/events/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: event,
    });
    await store.fetchSchedule();
    await forceRerender();
  } catch (error) {
    console.log(error);
  }
};

const options: object = reactive({
  plugins: [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev, next, today",
    center: "title",
    right: "dayGridMonth, dayGridWeek",
  },
  editable: true,
  selectable: true,
  weekends: true,
  select: (arg: any) => {
    const cal = arg.view.calendar;
    cal.unselect();
    cal.addEvent({
      id: useRoute().query.location,
      title: "New event",
      start: arg.start,
      end: arg.end,
      allDay: false,
    });
  },
  eventClick: (arg: any) => {
    if (!arg.event) return;
    if (!token) return;

    store.dialog = true;
    store.fetchEvent(arg.event.id);
  },
  events: [],
  eventAdd: (arg: object) => {
    createEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      allDay: arg.event.allDay,
    });
  },
  eventChange: (arg: object) => {
    updateEvent(
      {
        id: arg.event.id,
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end,
        allDay: arg.event.allDay,
      },
      arg.event.id
    );
  },
});
options.events = computed(() => {
  return store.schedules;
});

onMounted(() => {
  forceRerender();
});
</script>
<style>
table {
  overflow: hidden;
  background: #fff;
}
button.fc--button.fc-button.fc-button-primary {
  display: none;
}
button.fc-dayGridWeek-button.fc-button.fc-button-primary {
  margin-left: 0;
}
button.fc-next-button.fc-button.fc-button-primary,
.fc-button-group {
  margin: 0 !important;
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
  margin-bottom: 0 !important;
  background: #2a2828;
}
th {
  background: #2a2828 !important;
  color: #fff;
}
.fc-button {
  border-radius: 0 !important;
  border: none !important;
}
.fc-button-primary {
  background: transparent !important;
}
.fc-toolbar-title {
  color: #fff;
}
.fc-col-header-cell {
  padding: 20px 0 !important;
}
.fc-col-header {
  min-width: 100% !important;
}
.fc-scrollgrid-sync-table,
.fc-daygrid-body.fc-daygrid-body-unbalanced,
.fc-scrollgrid-section.fc-scrollgrid-section-body.fc-scrollgrid-section-liquid,
.fc-scroller-harness.fc-scroller-harness-liquid {
  min-width: 100% !important;
  min-height: 600px !important;
}
.fc-view-harness.fc-view-harness-active,
.fc-dayGridMonth-view.fc-view.fc-daygrid {
  min-height: 671px !important;
}
.fc-daygrid-day-events {
  padding-bottom: 20px;
}
@media only screen and (max-width: 600px) {
  .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr {
    display: flex;
    flex-direction: column;
  }
  .fc-toolbar-chunk {
    min-width: 100%;
    display: flex;
    justify-content: center;
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