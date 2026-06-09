<script setup lang="ts">
	import type { Sample } from '../types/barcodeStatus.type'

	defineProps<{ samples: Sample[] }>()
	defineEmits<{ reset: [] }>()

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	function statusClass(s: string) {
		switch (s?.toLowerCase()) {
			case 'complete':
				return 'text-green-600 font-semibold'
			case 'pending':
				return 'text-yellow-600 font-semibold'
			case 'shipped':
				return 'text-blue-600 font-semibold'
			default:
				return 'text-gray-600'
		}
	}
</script>

<template>
	<div class="text-left">
		<h2 class="text-lg font-semibold text-gray-900 mb-4">
			{{
				samples.length === 1
					? 'Your sample'
					: `Matching records (${samples.length})`
			}}
		</h2>
		<div
			v-for="sample in samples"
			:key="sample.barcode"
			class="bg-green-50 border border-green-200 rounded-lg p-4 mb-3"
		>
			<p class="font-medium text-gray-900">{{ sample.name }}</p>
			<p class="text-sm text-gray-600">
				<span class="font-medium">Birthday:</span>
				{{ formatDate(sample.birthday) }}
			</p>
			<p class="text-sm text-gray-600">
				<span class="font-medium">Status:</span>
				<span :class="statusClass(sample.status)">{{ sample.status }}</span>
			</p>
			<p class="text-xs text-gray-400">Barcode: {{ sample.barcode }}</p>
		</div>
		<button
			@click="$emit('reset')"
			class="mt-4 w-full py-2.5 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
		>
			Look up another
		</button>
	</div>
</template>
