<template>
  <div>
    <form @submit.prevent>
      <UIInput placeholder="Dazan name" v-model:value="dazan.title" />
      <UIInput placeholder="Dazan address" v-model:value="dazan.address" />
      <UIButton @click="createDazan">Create Dazan</UIButton>
    </form>
    <TheDazanList :dazans="dazans" />
  </div>
</template>
<script setup>
const url = `https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/items`;
const dazan = {
  title: "",
  address: "",
};
const { data: dazans } = await useAsyncData("dazan", () =>
  $fetch(`${url}/dazan`)
);

dazans.value = dazans.value.data;

const createDazan = () => {
  try {
    return $fetch(`${url}/dazan`, {
      method: "POST",
      body: dazan,
    })
      .then(() => dazans.value.push(dazan))
      .then(() => console.log(dazan))
  } catch (error) {
    console.log(error);
  }
};
</script>
<style>
body {
  background: #000;
  color: #fff;
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