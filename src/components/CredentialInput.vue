<script setup lang="ts">
	import { ref } from 'vue'

	const props = defineProps<{
		sample: {
			name: string
			birthday: string
		}
	}>()

	const emit = defineEmits<{
		verified: []
		back: []
	}>()

	const name = ref('')
	const birthday = ref('')
	const error = ref('')

	function verify() {
		error.value = ''

		const nameMatch = props.sample.name
			.toLowerCase()
			.includes(name.value.toLowerCase())

		const birthdayMatch = birthday.value === props.sample.birthday

		if (nameMatch && birthdayMatch) {
			emit('verified')
		} else {
			error.value = 'Name or birthday does not match.'
		}
	}
</script>

<template>
	<div class="text-left">
		<p class="text-gray-600 mb-4 text-sm">Confirm your identity to continue.</p>
		<label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
		<input
			v-model.trim="name"
			type="text"
			placeholder="Full name"
			class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
			@keyup.enter="verify"
		/>
		<label class="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
		<input
			v-model="birthday"
			type="date"
			class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
			@keyup.enter="verify"
		/>
		<button
			@click="verify"
			:disabled="!name || !birthday"
			class="w-full py-2.5 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			Verify
		</button>
		<div
			v-if="error"
			class="mt-3 bg-red-100 text-red-700 p-3 rounded-lg text-sm"
		>
			{{ error }}
		</div>
	</div>
</template>
