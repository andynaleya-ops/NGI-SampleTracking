<script setup lang="ts">
	import type { SampleType } from '../types/sample.type'
	import { censorName } from '../utilities/functions'

	defineProps<{ samples: SampleType[] }>()
	defineEmits<{ reset: [] }>()

	const formatDate = (iso: string) => {
		return new Date(iso).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	const statusClass = (s: string) => {
		switch (s?.toLowerCase()) {
			case 'sample_received':
				return 'px-2 rounded-full bg-gray-400 text-white font-semibold'
			case 'in_process':
				return 'px-2 rounded-full bg-blue-400 text-white font-semibold'
			case 'resampling':
				return 'px-2 rounded-full bg-orange-400 text-white font-semibold'
			case 'report_released':
				return 'px-2 rounded-full bg-green-400 text-white font-semibold'
			case 'rejected':
				return 'px-2 rounded-full bg-red-400 text-white font-semibold'
			default:
				return 'px-2 rounded-full bg-gray-400 text-white font-semibold'
		}
	}
</script>

<template>
	<div class="text-left">
		<div class="mb-4">
			<h2 class="text-lg font-semibold text-gray-900">
				Sample status for: {{ censorName(samples[0].name) }}
			</h2>
			<p class="text-sm text-gray-600">
				<span class="font-medium">Birthday:</span>
				{{ formatDate(samples[0].birthday) }}
			</p>
		</div>

		<div
			v-for="sample in samples"
			:key="sample.barcode"
			class="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-3"
		>
			<p class="text-sm text-gray-600">
				<span class="font-medium">Product:</span>
				{{ sample.product }}
			</p>
			<div class="flex gap-2 text-sm text-gray-600">
				<span class="font-medium">Status:</span>
				<div :class="statusClass(sample.status)">
					{{ sample.status }}
				</div>
			</div>
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
