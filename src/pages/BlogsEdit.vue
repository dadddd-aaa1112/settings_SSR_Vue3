<template>
	<div>
		<div v-if="isDelete">
			<h1>Блог удален</h1>
		</div>

		<div v-else>
			<div v-if="isSaving">
				<h1>Изменения сохранены</h1>
			</div>
			<h1>EDIT page with id = {{ $route.params.id }}</h1>
			<input v-model="titleModel" />
			<div>
				<input v-model="bodyModel" />
			</div>
			<p>namemee {{ id }} {{ titleModel }}</p>
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

<style>
.btn {
	margin-right: 5px;
}

.hide {
	display: none;
}
</style>
