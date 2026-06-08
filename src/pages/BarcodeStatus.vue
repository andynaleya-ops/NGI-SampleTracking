<script setup lang="ts">
	import { ref } from 'vue'
	import BarcodeInput from '../components/BarcodeInput.vue'
	import CredentialInput from '../components/CredentialInput.vue'
	import StatusDisplay from '../components/StatusDisplay.vue'
	import type { Sample } from '../types/barcodeStatus.type.ts'

	const step = ref<'barcode' | 'challenge' | 'result'>('barcode')
	const currentSample = ref<Sample | null>(null)

	function onBarcodeFound(sample: Sample) {
		currentSample.value = sample
		step.value = 'challenge'
	}

	function reset() {
		step.value = 'barcode'
		currentSample.value = null
	}
</script>

<template>
	<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
		<div class="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
			<h1 class="text-2xl font-bold text-gray-900 mb-1">Sample Status</h1>
			<p class="text-gray-500 mb-6">
				{{
					step === 'result'
						? 'Your sample details'
						: 'Enter your barcode to begin'
				}}
			</p>

			<BarcodeInput v-if="step === 'barcode'" @found="onBarcodeFound" />

			<CredentialInput
				v-if="step === 'challenge' && currentSample"
				:sample="currentSample"
				@verified="step = 'result'"
				@back="step = 'barcode'"
			/>

			<StatusDisplay
				v-if="step === 'result' && currentSample"
				:sample="currentSample"
				@reset="reset"
			/>
		</div>
	</div>
</template>
