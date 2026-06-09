<script setup lang="ts">
	import { ref } from 'vue'
	import type { Sample } from '../types/barcodeStatus.type'
	import CredentialInput from '../components/CredentialInput.vue'
	import StatusResult from '../components/StatusResult.vue'

	const step = ref<'challenge' | 'result'>('challenge')
	const currentSamples = ref<Sample[]>([])

	function onCredentialsFound(samples: Sample[]) {
		currentSamples.value = samples
		step.value = 'result'
	}

	function reset() {
		step.value = 'challenge'
		currentSamples.value = []
	}
</script>

<template>
	<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
		<div class="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
			<h1 class="text-2xl font-bold text-gray-900 mb-1">Sample Status</h1>
			<p class="text-gray-500 mb-6">
				Enter your credentials to view your status
			</p>

			<CredentialInput
				v-if="step === 'challenge'"
				@found="onCredentialsFound"
			/>

			<StatusResult
				v-if="step === 'result'"
				:samples="currentSamples"
				@reset="reset"
			/>

			<!-- <StatusLis
				v-if="step === 'result' && currentSamples.length > 1"
				:samples="currentSamples"
				@reset="reset"
			/> -->
		</div>
	</div>
</template>
