<script setup lang="ts">
	import { ref } from 'vue'
	import type { SampleType } from '../types/sample.type'

	const emit = defineEmits<{
		found: [samples: SampleType[]]
	}>()

	const name = ref('')
	const birthday = ref('')
	const loading = ref(false)
	const error = ref('')

	const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
	const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

	const lookup = async () => {
		if (!name.value || !birthday.value) return

		loading.value = true
		error.value = ''

		try {
			const url = `${SUPABASE_URL}/rest/v1/samples?name=ilike.${encodeURIComponent(name.value)}&birthday=eq.${encodeURIComponent(birthday.value)}`
			const res = await fetch(url, {
				headers: {
					apikey: SUPABASE_ANON_KEY,
					Authorization: `Bearer ${SUPABASE_ANON_KEY}`
				}
			})

			if (!res.ok) throw new Error(`Server error (${res.status})`)

			const data: SampleType[] = await res.json()
			if (data.length > 0) {
				emit('found', data)
			} else {
				error.value = 'No record found for that name and date of birth.'
			}
		} catch (e: any) {
			error.value = e.message || 'Something went wrong.'
		} finally {
			loading.value = false
		}
	}
</script>

<template>
	<div>
		<div class="flex flex-col gap-4">
			<div>
				<label
					for="name"
					class="block text-sm font-semibold text-slate-700 mb-2"
				>
					Full name
				</label>
				<input
					id="name"
					v-model.trim="name"
					type="text"
					placeholder="Example: Alya Putri"
					class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
					@keyup.enter="lookup"
				/>
			</div>

			<div>
				<label
					for="birthday"
					class="block text-sm font-semibold text-slate-700 mb-2"
				>
					Date of birth
				</label>
				<input
					id="birthday"
					v-model="birthday"
					type="date"
					class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
					@keyup.enter="lookup"
				/>
			</div>

			<button
				@click="lookup"
				:disabled="!name || !birthday || loading"
				class="w-full rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white flex items-center justify-center gap-2 hover:bg-teal-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
			>
				<span
					v-if="loading"
					class="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
				></span>
				{{ loading ? 'Searching...' : 'Look up status' }}
			</button>
		</div>

		<div
			v-if="error"
			class="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
		>
			{{ error }}
		</div>
	</div>
</template>
