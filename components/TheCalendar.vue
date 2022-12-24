<template>
  <ClientOnly placeholder="loading...">
    <transition name="fade">
      <FullCalendar v-bind:options="options" class="min-w-full bg-primary" />
    </transition>
  </ClientOnly>
</template>
<script setup lang="ts">
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const token = useDirectusToken();
const createEvent = async (event: object) => {
  try {
    await $fetch(`${store.url}/items/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: event,
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
const removeEvent = async (event: string) => {
  try {
    await $fetch(`${store.url}/items/events/${event}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  } catch (error) {}
};
const updateEvent = async (event: object, id: string) => {
  try {
    await $fetch(`${store.url}/items/events/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: event,
    });
  } catch (error) {
    console.log(error)
  }
};

const id = ref(0);
const { createItems } = useDirectusItems();
const store = usePiniaStore();
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
    id.value = id.value + 1;

    const cal = arg.view.calendar;
    cal.unselect();
    cal.addEvent({
      title: "New event",
      start: arg.start,
      end: arg.end,
      allDay: true,
    });
  },
  eventClick: (arg: any) => {
    if (arg.event) {
      arg.event.remove();
    }
  },
  events: [],
  eventAdd: (arg: object) => {
    createEvent({
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      location_id: useRoute().query.location,
    });
  },
  eventChange: (arg: object) => {
    updateEvent(
      {
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end,
      },
      arg.event.id
    );
  },
  eventRemove: (arg: any) => {
    removeEvent(arg.event.id);
  },
});

options.events = computed(() => {
  return store.schedules;
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