<template>
  <div class="min-h-screen bg-base-100">
    <ClientOnly>
      <template #default>
        <transition name="blur">
          <TheNavbar />
        </transition>
        <transition name="fade">
          <UIToast v-if="store.toastVisible == true"
            >Success. {{ store.message }}</UIToast
          >
        </transition>
      </template>
      <template fallback-tag="button" #fallback>
        <transition name="blur">
          <div
            class="loader min-w-full flex items-center justify-center bg-base-100 min-h-screen"
          >
            <button class="btn btn-square loading btn-primary btn-lg"></button>
          </div>
        </transition>
      </template>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
const store = usePiniaStore();

const { messageFunction } = messageLogin();

onMounted(() => {
  messageFunction();
});
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.blur-enter-active,
.blur-leave-active {
  transition: all 0.4s ease-in-out;
}
.blur-enter-from,
.blur-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
html {
  overflow-y: hidden;
}
body {
  background: #000;
  color: #000;
}
/* Указываем box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Убираем внутренние отступы */
ul[class],
ol[class] {
  padding: 0;
}

/* Убираем внешние отступы */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Выставляем основные настройки по-умолчанию для body */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* Удаляем стандартную стилизацию для всех ul и il, у которых есть атрибут class*/
ul[class],
ol[class] {
  list-style: none;
}

/* Элементы a, у которых нет класса, сбрасываем до дефолтных стилей */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Упрощаем работу с изображениями */
img {
  max-width: 100%;
  display: block;
}

/* Указываем понятную периодичность в потоке данных у article*/
article > * + * {
  margin-top: 1em;
}

/* Наследуем шрифты для инпутов и кнопок */
input,
button,
textarea,
select {
  font: inherit;
}

/* Удаляем все анимации и переходы для людей, которые предпочитай их не использовать */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
