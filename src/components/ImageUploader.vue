<template>
  <!-- Show upload area if no image is uploaded -->
  <div v-if="!imageUrl" class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50
             dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <!-- Upload icon -->
        <svg
          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <!-- Instructions text -->
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 32MB)</p>
      </div>
      <!-- Hidden file input -->
      <input id="dropzone-file" type="file" class="hidden" @change="onFileChange" />
    </label>
  </div>

  <!-- Show uploading spinner if uploading -->
  <div v-if="uploading" class="flex items-center mt-4 space-x-2">
    <svg class="w-6 h-6 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
    <span class="text-sm text-gray-600 dark:text-gray-300">Uploading image...</span>
  </div>

  <!-- Show uploaded image preview -->
  <div v-else-if="imageUrl" class="relative mt-4 p-4 bg-white border-dashed rounded-lg shadow-sm">
    <!-- Remove image button -->
    <div class="absolute top-2 right-2">
      <button
        type="button"
        @click="removeImage"
        class="text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
        data-hs-file-upload-remove
      >
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" x2="10" y1="11" y2="17"></line>
          <line x1="14" x2="14" y1="11" y2="17"></line>
        </svg>
      </button>
    </div>
    <p class="font-semibold text-gray-800 dark:text-white mb-2">Your uploaded image:</p>
    <img :src="imageUrl" alt="Uploaded" class="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-neutral-600" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

// Get uploading state from Vuex store
const uploading = computed(() => store.getters['imagepost/isUploading'])
// Get uploaded image URL from Vuex store
const imageUrl = computed(() => store.getters['imagepost/uploadedImageUrl'])

// Handle file input change event to upload file
function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  store.dispatch('imagepost/uploadImage', file)
}

// Dispatch action to remove uploaded image preview
function removeImage() {
  store.dispatch('imagepost/deleteImagePreview')
}
</script>
