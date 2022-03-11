<template>
	<div>
		<div v-if="isDelete">
			<h2>Блог удален</h2>
		</div>

		<div v-else>
			<div v-if="isSaving">
				<h2>Изменения сохранены</h2>
			</div>
			<h1>Редактирование страницы</h1>
			<input v-model="titleModel" />
			<div>
				<input v-model="bodyModel" />
			</div>
			<h3>{{ titleModel }}</h3>
			<p>{{ bodyModel }}</p>
			<button class="btn" @click="removeBlog">Удалить</button>
			<button class="btn" @click="save">Сохранить</button>
		</div>
		<button @click="$router.push('/')">Вернуться на главную страницу</button>
	</div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useBlogsFunction } from '../use/blogsFunction'
import { ref } from 'vue'

export default {
	setup() {
		const { blogs, idItem, fetchIdBlogs, removeItem, saveIdBlogs } =
			useBlogsFunction()

		const route = useRoute()
		const id = route.params.id
		fetchIdBlogs(id)

		const titleModel = ref(idItem.value.title)
		const bodyModel = ref(idItem.value.body)
		const isDelete = ref(false)
		const isSaving = ref(false)

		const save = () => {
			const item = {
				id: id,
				body: bodyModel.value,
				title: titleModel.value,
			}

			saveIdBlogs(id, item)
			console.log('update success, item: ', item)
			isSaving.value = true
		}

		const removeBlog = () => {
			removeItem(id)
			isDelete.value = true
			console.log('delete success')
		}

		return {
			id,
			idItem,
			fetchIdBlogs,
			removeBlog,
			saveIdBlogs,
			save,
			bodyModel,
			titleModel,
			blogs,
			isDelete,
			isSaving,
		}
	},
}
</script>

<style></style>
