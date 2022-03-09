<template>
	<div>
		<h1>EDIT page with id = {{ $route.params.id }}</h1>
		<input v-model="idItem.title" />
		<div>
			<input v-model="idItem.body" />
		</div>
		<p>namemee {{ id }} {{ idItem.title }}</p>
		<p>{{ idItem.body }}</p>
		<button class="btn" @click="removeItem(id)">Удалить</button>
		<button class="btn" @click="save" v-if="!isDisabled">Сохранить</button>

		<button v-else @click="$router.push('/')">
			Вернуться на главную страницу
		</button>
		<button class="btn" @click="$router.push('./')">Отмена</button>
	</div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useBlogsFunction } from '../use/blogsFunction'
import { onMounted, ref } from 'vue'
import uniqid from 'uniqid'

export default {
	setup() {
		const { idItem, fetchIdBlogs, removeItem, saveIdBlogs } = useBlogsFunction()

		const route = useRoute()
		const id = route.params.id
		onMounted(fetchIdBlogs(id))

		const mainPage = ref(false)
		const isDisabled = ref(false)

		const save = () => {
			const item = {
				id: uniqid(),
				body: idItem.body,
				title: idItem.title,
			}
			saveIdBlogs(id, item)
			mainPage.value = true
			isDisabled.value = true
			console.log(mainPage.value)
		}

		return {
			id,
			idItem,
			fetchIdBlogs,
			removeItem,
			saveIdBlogs,
			save,
			mainPage,
			isDisabled,
		}
	},
}
</script>

<style>
.btn {
	margin-right: 5px;
}

.hide {
	display: none;
}
</style>
